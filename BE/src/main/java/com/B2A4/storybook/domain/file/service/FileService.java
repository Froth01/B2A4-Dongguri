package com.B2A4.storybook.domain.file.service;

import com.B2A4.storybook.domain.file.exception.*;
import com.B2A4.storybook.domain.file.presentation.dto.response.UploadFileResponse;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.util.IOUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class FileService implements FileUtils {

    @Value("${aws.s3.bucket}")
    private String bucket;

    @Value("${aws.s3.base-url}")
    private String baseUrl;

    private static final int IMAGE_SIZE = 50;
    private static final int AUDIO_SIZE = 50;

    private final AmazonS3 amazonS3;

    public UploadFileResponse uploadImage(MultipartFile file) {
        validateFile(file, IMAGE_SIZE, new String[]{"jpg", "HEIC", "jpeg", "png", "heic"});
        String url = uploadToS3(file);
        return new UploadFileResponse(url);
    }

    public UploadFileResponse uploadAudio(MultipartFile file) {
        validateFile(file, AUDIO_SIZE, new String[]{"mp3"});
        String url = uploadToS3(file);
        return new UploadFileResponse(url);
    }

    private void validateFile(MultipartFile file, int sizeThreshold, String[] exts) {
        if (file.isEmpty()) {
            throw FileEmptyException.EXCEPTION;
        }

        if (file.getSize() <= sizeThreshold) {
            throw FileSizeException.EXCEPTION;
        }

        String originalFilename = file.getOriginalFilename();
        String ext = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);
        if (!isExtensionAllowed(ext, exts)) {
            throw BadFileExtensionException.EXCEPTION;
        }
    }

    private String uploadToS3(MultipartFile file) {
        String fileName = generateFileName(file);
        try {
            ObjectMetadata objMeta = new ObjectMetadata();
            byte[] bytes = IOUtils.toByteArray(file.getInputStream());
            objMeta.setContentType(file.getContentType());
            objMeta.setContentLength(bytes.length);
            amazonS3.putObject(
                    new PutObjectRequest(bucket, fileName, file.getInputStream(), objMeta)
                            .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (IOException e) {
            throw FileUploadFailException.EXCEPTION;
        }
        log.info("url = {}", fileName);
        return baseUrl + "/" + fileName;
    }

    private boolean isExtensionAllowed(String extension, String[] allowedExtensions) {
        for (String allowedExtension : allowedExtensions) {
            if (extension.equalsIgnoreCase(allowedExtension)) {
                return true;
            }
        }
        return false;
    }

    private String generateFileName(MultipartFile file) {
        String originalFilename = file.getOriginalFilename();
        String ext = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);
        String randomName = UUID.randomUUID().toString();
        return randomName + "." + ext;
    }

    @Override
    public void delete(String objectName) {
        amazonS3.deleteObject(bucket, objectName);
    }
}
