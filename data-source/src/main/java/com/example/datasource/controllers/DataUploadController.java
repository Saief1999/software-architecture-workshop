package com.example.datasource.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.example.datasource.services.WasabiUploader;

@RestController
public class DataUploadController {

    private WasabiUploader wasabiUploader;

    public DataUploadController(WasabiUploader wasabiUploader) {
        this.wasabiUploader = wasabiUploader;
    }

    @PostMapping("/upload")
    public ResponseEntity<?> handleFileUpload(@RequestParam("file") MultipartFile file ) {

        String fileName = file.getOriginalFilename();
        try {
            wasabiUploader.uploadFile(fileName, file.getBytes());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.ok("New Data Uploaded");
    }
}
