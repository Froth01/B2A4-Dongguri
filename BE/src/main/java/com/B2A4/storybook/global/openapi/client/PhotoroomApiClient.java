package com.B2A4.storybook.global.openapi.client;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.IOException;
import java.util.UUID;

@Component
public class PhotoroomApiClient {
    private final WebClient webClient;

    public PhotoroomApiClient(WebClient photoroomWebClient) {
        this.webClient = photoroomWebClient;
    }

    public byte[] removeBackground(String inputImageUrl) {
        try {
            byte[] imageData = downloadImage(inputImageUrl);
            String fileName = UUID.randomUUID().toString() + ".jpg";

            MultipartBodyBuilder bodyBuilder = new MultipartBodyBuilder();
            bodyBuilder.part("image_file", new ByteArrayResource(imageData))
                    .filename(fileName)
                    .contentType(MediaType.IMAGE_JPEG);

            return webClient.post()
                    .uri("/v1/segment")
                    .contentType(MediaType.MULTIPART_FORM_DATA)
                    .body(BodyInserters.fromMultipartData(bodyBuilder.build()))
                    .retrieve()
                    .bodyToMono(byte[].class)
                    .block();

        } catch (IOException e) {
            throw new RuntimeException("Failed to process image", e);
        }
    }

    private byte[] downloadImage(String imageUrl) throws IOException {
        return webClient.get()
                .uri(imageUrl)
                .retrieve()
                .bodyToMono(byte[].class)
                .block();
    }
}