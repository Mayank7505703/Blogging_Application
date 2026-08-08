package com.mayank.blog_app.App_config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.File;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${project.image}")
    private String imagePath;

    // Serves uploaded post images at GET /images/<filename>, matching the
    // /images/** rule already permitted in SecurityConfig.
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String location = "file:" + new File(imagePath).getAbsolutePath() + File.separator;
        registry.addResourceHandler("/images/**")
                .addResourceLocations(location);
    }
}
