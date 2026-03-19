package com.sportgear;

import com.sportgear.config.SecurityProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(SecurityProperties.class)
public class SportGearApplication {

    public static void main(String[] args) {
        SpringApplication.run(SportGearApplication.class, args);
    }
}
