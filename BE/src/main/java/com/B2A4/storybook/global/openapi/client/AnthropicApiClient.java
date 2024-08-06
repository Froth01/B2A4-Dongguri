package com.B2A4.storybook.global.openapi.client;

import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Component
public class AnthropicApiClient {
    private final WebClient webClient;

    public AnthropicApiClient(WebClient anthropicWebClient) {
        this.webClient = anthropicWebClient;
    }

    public String sendMessageWithImage(String message, String base64Image) {
        Map<String, Object> requestBody = Map.of(
                "model", "claude-3-5-sonnet-20240620",
                "max_tokens", 1024,
                "messages", List.of(
                        Map.of(
                                "role", "user",
                                "content", List.of(
                                        Map.of("type", "text", "text", message),
                                        Map.of("type", "image", "source", Map.of(
                                                "type", "base64",
                                                "media_type", "image/jpeg",
                                                "data", base64Image
                                        ))
                                )
                        )
                )
        );

        return webClient.post()
                .uri("/v1/messages")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
}
