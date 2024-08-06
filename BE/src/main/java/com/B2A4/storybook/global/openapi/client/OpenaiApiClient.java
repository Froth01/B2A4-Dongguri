package com.B2A4.storybook.global.openapi.client;

import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Component
public class OpenaiApiClient {
    private final WebClient webClient;

    public OpenaiApiClient(WebClient openaiWebClient) {
        this.webClient = openaiWebClient;
    }

    public String sendMessageToImage(String prompt) {
        Map<String, Object> requestBody = Map.of(
                "model", "dall-e-2",
                "prompt", prompt,
                "size", "1024x1024",
                "quality", "standard",
                "n", 1
        );

        return webClient.post()
                .uri("/v1/images/generations")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    public String sendMessage(String prompt) {
        Map<String, Object> requestBody = Map.of(
                "model", "gpt-4o",
                "messages", List.of(
                        Map.of(
                                "role", "user",
                                "content", prompt
                        )
                )
        );

        return webClient.post()
                .uri("/v1/chat/completions")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
}