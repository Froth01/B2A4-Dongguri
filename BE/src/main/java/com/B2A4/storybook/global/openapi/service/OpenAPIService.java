package com.B2A4.storybook.global.openapi.service;

import com.B2A4.storybook.domain.file.service.FileServiceUtils;
import com.B2A4.storybook.domain.storybook.presentation.dto.request.TransformStorybookRequest;
import com.B2A4.storybook.global.openapi.client.AnthropicApiClient;
import com.B2A4.storybook.global.openapi.client.OpenaiApiClient;
import com.B2A4.storybook.global.openapi.client.PhotoroomApiClient;
import com.B2A4.storybook.global.openapi.exception.ApiImageUploadFileException;
import com.B2A4.storybook.global.openapi.exception.ApiJsonParseException;
import com.amazonaws.util.IOUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class OpenAPIService implements OpenAPIServiceUtils {

    private final FileServiceUtils fileUtils;
    private final AnthropicApiClient anthropicApiClient;
    private final OpenaiApiClient openaiApiClient;
    private final PhotoroomApiClient photoroomApiClient;

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
        try {
            byte[] processedImageData = photoroomApiClient.removeBackground(inputImageUrl);

            MultipartFile multipartFile = new MockMultipartFile(
                    UUID.randomUUID().toString() + ".png",
                    "image.png",
                    "image/png",
                    processedImageData
            );

            return fileUtils.uploadToS3(multipartFile);
        } catch (Exception e) {
            throw ApiImageUploadFileException.EXCEPTION;
        }
    }
}
