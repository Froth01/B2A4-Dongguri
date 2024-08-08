package com.B2A4.storybook.global.openapi.service;

import com.B2A4.storybook.domain.file.service.FileServiceUtils;
import com.B2A4.storybook.global.openapi.client.AnthropicApiClient;
import com.B2A4.storybook.global.openapi.client.OpenaiApiClient;
import com.B2A4.storybook.global.openapi.exception.ApiImageUploadFileException;
import com.B2A4.storybook.global.openapi.exception.ApiJsonParseException;
import com.B2A4.storybook.domain.storybook.presentation.dto.request.TransformStorybookRequest;
import com.amazonaws.util.IOUtils;
import lombok.RequiredArgsConstructor;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Service;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class OpenAPIService implements OpenAPIServiceUtils {

    private final FileServiceUtils fileUtils;
    private final AnthropicApiClient anthropicApiClient;
    private final OpenaiApiClient openaiApiClient;

    @Value("${api.remove-key}")
    private String removeKey;

    @Override
    public String generateClaude(TransformStorybookRequest transformStorybookRequest) {
        String message = "What is in this image? keyword: " + transformStorybookRequest.keywords()
                + ". 장르 : " + transformStorybookRequest.genre()
                + ". 이미지 타입 : " + transformStorybookRequest.transformType()
                + ". (message_content_max_length:600)";
        String base64Image = fileUtils.encodeImageToBase64(transformStorybookRequest.originalImageUrl());
        String response = anthropicApiClient.sendMessageWithImage(message, base64Image);
        String prompt = null;

        try {
            JSONObject jsonResponse = new JSONObject(response);
            JSONArray contentArray = jsonResponse.getJSONArray("content");
            JSONObject contentObject = contentArray.getJSONObject(0);
            prompt = contentObject.getString("text");

        } catch (JSONException e) {
            throw ApiJsonParseException.EXCEPTION;
        }
        return prompt;
    }

    @Override
    public String generateChatgpt(TransformStorybookRequest transformStorybookRequest) {

        String message = "4~6세의 아동용 동화 내용을 만들어줘."
                + "3줄 정도의 내용."
                + " 키워드: " + transformStorybookRequest.keywords()
                + " 장르: " + transformStorybookRequest.genre()
                + " 출력은 동화 내용만 나오게 해줘";

        String jsonResponse = openaiApiClient.sendMessage(message);
        String content = null;
        try {
            JSONObject jsonObject = new JSONObject(jsonResponse);
            JSONArray choicesArray = jsonObject.getJSONArray("choices");
            JSONObject choiceObject = choicesArray.getJSONObject(0);
            JSONObject messageObject = choiceObject.getJSONObject("message");
            content = messageObject.getString("content");
        } catch (JSONException e) {
            throw ApiJsonParseException.EXCEPTION;
        }

        return content;
    }

    @Override
    public String generateDalle(String prompt) {
        String response = openaiApiClient.sendMessageToImage(prompt);
        String responseImageUrl = null;
        try {
            JSONObject jsonResponse = new JSONObject(response);
            JSONArray dataArray = jsonResponse.getJSONArray("data");
            if (dataArray.length() > 0) {
                JSONObject dataObject = dataArray.getJSONObject(0);
                responseImageUrl = dataObject.getString("url");
            }
        } catch (JSONException e) {
            throw ApiJsonParseException.EXCEPTION;
        }

        String transformIamgeUrl = null;
        try {
            URL url = new URL(responseImageUrl);
            InputStream inputStream = url.openStream();
            byte[] bytes = IOUtils.toByteArray(inputStream);
            String fileName = UUID.randomUUID() + ".jpg";
            MultipartFile multipartFile = new MockMultipartFile(fileName, fileName, "image/jpeg", new ByteArrayInputStream(bytes));
            transformIamgeUrl = fileUtils.uploadImage(multipartFile).url();
        } catch (IOException e) {
            throw ApiImageUploadFileException.EXCEPTION;
        }

        return transformIamgeUrl;
    }

    @Override
    public String removeBackground(String inputImageUrl) {
        String removeImageUrl = null;
        try {
            // Define multipart boundary
            String boundary = "----------" + UUID.randomUUID().toString().replaceAll("-", "");

            // Get mimetype of image
            String contentType = URLConnection.guessContentTypeFromName(inputImageUrl);
            if (contentType == null) {
                contentType = "application/octet-stream"; // Default type if guessing fails
            }

            // Prepare the POST data
            byte[] imageData = readFromUrl(inputImageUrl);
            String fileName = inputImageUrl.substring(inputImageUrl.lastIndexOf('/') + 1);

            StringBuilder body = new StringBuilder();
            body.append("--").append(boundary).append("\r\n");
            body.append("Content-Disposition: form-data; name=\"image_file\"; filename=\"").append(fileName).append("\"\r\n");
            body.append("Content-Type: ").append(contentType).append("\r\n\r\n");
            byte[] bodyBytes = body.toString().getBytes("UTF-8");

            // Set up the HTTP connection and headers
            URL url = new URL("https://sdk.photoroom.com/v1/segment");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
            conn.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + boundary);
            conn.setRequestProperty("x-api-key", removeKey);

            // Write the POST data to the connection
            try (OutputStream os = conn.getOutputStream()) {
                os.write(bodyBytes);
                os.write(imageData);
                os.write(("\r\n--" + boundary + "--\r\n").getBytes("UTF-8"));
            }

            // Handle the response
            int responseCode = conn.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                // Save the resulting image to a byte array
                ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
                try (InputStream is = conn.getInputStream()) {
                    byte[] buffer = new byte[4096];
                    int bytesRead;
                    while ((bytesRead = is.read(buffer)) != -1) {
                        outputStream.write(buffer, 0, bytesRead);
                    }
                }

                // Convert byte array to MultipartFile using MockMultipartFile
                byte[] resultImageData = outputStream.toByteArray();
                MultipartFile multipartFile = new MockMultipartFile(
                        "image_file",
                        UUID.randomUUID().toString() + ".png", // 파일 이름 설정
                        contentType,
                        resultImageData
                );

                // Upload the resulting image to S3
                removeImageUrl = fileUtils.uploadToS3(multipartFile);
            } else {
                System.out.println("Error: " + responseCode + " - " + conn.getResponseMessage());
                try (InputStream is = conn.getErrorStream()) {
                    byte[] buffer = new byte[4096];
                    int bytesRead;
                    while ((bytesRead = is.read(buffer)) != -1) {
                        System.out.write(buffer, 0, bytesRead);
                    }
                }
            }

            // Close the connection
            conn.disconnect();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return removeImageUrl;
    }

    private static byte[] readFromUrl(String imageUrl) throws IOException {
        try (InputStream is = new URL(imageUrl).openStream();
             ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            byte[] buffer = new byte[4096];
            int bytesRead;
            while ((bytesRead = is.read(buffer)) != -1) {
                baos.write(buffer, 0, bytesRead);
            }
            return baos.toByteArray();
        }
    }
}
