package com.B2A4.storybook.domain.file.service;

import com.B2A4.storybook.domain.file.presentation.dto.response.UploadFileResponse;
import org.springframework.web.multipart.MultipartFile;

public interface FileServiceUtils {
    void delete(String objectName);

    UploadFileResponse uploadImage(MultipartFile file);

    String uploadToS3(MultipartFile file);

    String encodeImageToBase64(String imageUrl);
}
