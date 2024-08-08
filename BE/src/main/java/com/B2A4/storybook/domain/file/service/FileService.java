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
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Base64;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class FileService implements FileServiceUtils {

    @Value("${aws.s3.bucket}")
    private String bucket;

    @Value("${aws.s3.base-url}")
    private String baseUrl;

    private static final int IMAGE_SIZE = 50;
    private static final int AUDIO_SIZE = 50;

    private final AmazonS3 amazonS3;

    @Override
    public UploadFileResponse uploadImage(MultipartFile file) {
        validateFile(file, IMAGE_SIZE, new String[]{"jpg", "jpeg", "png"});

        try {
            BufferedImage image = ImageIO.read(file.getInputStream());
            BufferedImage newImage = new BufferedImage(image.getWidth(), image.getHeight(), BufferedImage.TYPE_INT_RGB);
            Graphics2D g = newImage.createGraphics();
            g.drawImage(image, 0, 0, Color.WHITE, null);
            g.dispose();
            ByteArrayOutputStream os = new ByteArrayOutputStream();
            ImageIO.write(newImage, "jpg", os);
            byte[] jpgBytes = os.toByteArray();
            file = new MockMultipartFile(file.getName(), UUID.randomUUID().toString() + ".jpg", "image/jpeg", jpgBytes);
        } catch (IOException e) {
            throw ImageProcessingException.EXCEPTION;
        }

        return new UploadFileResponse(uploadToS3(file));
    }

    public UploadFileResponse uploadAudio(MultipartFile file) {
        validateFile(file, AUDIO_SIZE, new String[]{"mp3"});
        return new UploadFileResponse(uploadToS3(file));
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

    @Override
    public String uploadToS3(MultipartFile file) {
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

    public String encodeImageToBase64(String imageUrl) {
        try {
            URL url = new URL(imageUrl);
            try (InputStream inputStream = url.openStream()) {
                byte[] imageBytes = IOUtils.toByteArray(inputStream);
                return Base64.getEncoder().encodeToString(imageBytes);
            }
        } catch (MalformedURLException e) {
            throw InvalidUrlException.EXCEPTION;
        } catch (Exception e) {
            throw ImageProcessingException.EXCEPTION;
        }
    }

    @Override
    public void delete(String objectName) {
        amazonS3.deleteObject(bucket, objectName);
    }
}
