package com.B2A4.storybook;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class StorybookApplication {

	public static void main(String[] args) {
		SpringApplication.run(StorybookApplication.class, args);
	}

}
