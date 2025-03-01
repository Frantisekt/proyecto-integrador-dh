package com.backend.globeonclick;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class GlobeOnClickApplication {

    public static void main(String[] args) {
        SpringApplication.run(GlobeOnClickApplication.class, args);
    }

}
