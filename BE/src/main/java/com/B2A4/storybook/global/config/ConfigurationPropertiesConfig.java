package com.B2A4.storybook.global.config;

import com.B2A4.storybook.global.property.JwtProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@EnableConfigurationProperties({JwtProperties.class})
@Configuration
public class ConfigurationPropertiesConfig {
}
