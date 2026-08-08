package com.mayank.blog_app.service.impl;

import com.mayank.blog_app.service.FileService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileServiceImpl implements FileService {

    @Override
    public String uploadImage(String path, MultipartFile file) throws IOException {
        String originalName = file.getOriginalFilename();
        String extension = "";
        if (originalName != null && originalName.contains(".")) {
            extension = originalName.substring(originalName.lastIndexOf('.'));
        }

        // Prefix with a random id so two uploads with the same original filename
        // don't overwrite each other.
        String name = UUID.randomUUID() + extension;
        String filePath = path + File.separator + name;

        File folder = new File(path);
        if (!folder.exists()) {
            folder.mkdirs();
        }

        Files.copy(file.getInputStream(), Paths.get(filePath));

        return name;
    }

    @Override
    public InputStream getResource(String path, String fileName) throws IOException {
        String fullPath = path + File.separator + fileName;
        return new FileInputStream(fullPath);
    }
}
