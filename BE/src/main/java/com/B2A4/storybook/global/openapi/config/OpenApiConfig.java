package com.B2A4.storybook.global.openapi.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Slf4j
@Configuration
public class OpenApiConfig {

    @Value("${api.anthropic-key}")
    private String anthropicApiKey;

    @Value("${api.openai-key}")
    private String openaiApiKey;

    @Value("${api.remove-key}")
    private String removeKey;

    @Bean
    public WebClient anthropicWebClient() {
        return WebClient.builder()
                .baseUrl("https://api.anthropic.com")
                .defaultHeader("x-api-key", anthropicApiKey)
                .defaultHeader("anthropic-version", "2023-06-01")
                .defaultHeader("content-type", "application/json")
                .build();
    }

    @Bean
    public WebClient openaiWebClient() {
        return WebClient.builder()
                .baseUrl("https://api.openai.com")
                .defaultHeader("Authorization", "Bearer " + openaiApiKey)
                .defaultHeader("content-type", "application/json")
                .build();
    }

    @Bean
    public WebClient photoroomWebClient() {
        return WebClient.builder()
                .baseUrl("https://sdk.photoroom.com")
                .defaultHeader("x-api-key", removeKey)
                .codecs(configurer -> configurer
                        .defaultCodecs()
                        .maxInMemorySize(50 * 1024 * 1024)) // 10MB로 증가
                .build();
    }

}