package com.B2A4.storybook.domain.file.presentation;

import com.B2A4.storybook.domain.file.presentation.dto.response.UploadFileResponse;
import com.B2A4.storybook.domain.file.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RequestMapping("/api")
@RestController
public class FileController {

    private final FileService fileService;

    @PostMapping("/file/image")
    public UploadFileResponse uploadImage(@RequestPart(value = "file") MultipartFile file) {
        return fileService.uploadImage(file);
    }

    @PostMapping("/file/audio")
    public UploadFileResponse uploadAudio(@RequestPart(value = "file") MultipartFile file) {
        return fileService.uploadAudio(file);
    }
}