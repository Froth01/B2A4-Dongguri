package com.B2A4.storybook.domain.file.presentation;

import com.B2A4.storybook.domain.file.presentation.dto.response.UploadFileResponse;
import com.B2A4.storybook.domain.file.service.FileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "파일", description = "파일 관련 API")
@RequiredArgsConstructor
@RequestMapping("/api/file")
@RestController
public class FileController {

    private final FileService fileService;

    @SecurityRequirements
    @Operation(summary = "이미지 업로드")
    @PostMapping("/image")
    public UploadFileResponse uploadImage(@RequestPart(value = "file") MultipartFile file) {
        return fileService.uploadImage(file);
    }
    @SecurityRequirements
    @Operation(summary = "오디오 업로드")
    @PostMapping("/audio")
    public UploadFileResponse uploadAudio(@RequestPart(value = "file") MultipartFile file) {
        return fileService.uploadAudio(file);
    }
}