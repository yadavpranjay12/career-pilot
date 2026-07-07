package com.careerpilot.career.dto.request;

import jakarta.validation.constraints.*;

import java.util.UUID;

public record CreateResumeRequest(
        @NotNull(message = "userId is required") UUID userId,

        @NotBlank(message = "Title is required")
        @Size(max = 200) String title,

        @NotBlank(message = "File name is required")
        @Size(max = 255) String fileName,

        @NotBlank(message = "File URL is required")
        @Pattern(regexp = "^(https?://).*", message = "File URL must start with http:// or https://")
        String fileUrl
) {}
