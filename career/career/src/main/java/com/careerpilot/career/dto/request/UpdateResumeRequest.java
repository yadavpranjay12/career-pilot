package com.careerpilot.career.dto.request;

import jakarta.validation.constraints.*;

public record UpdateResumeRequest(
        @NotBlank @Size(max = 200) String title,
        @NotBlank @Size(max = 255) String fileName,
        @NotBlank @Pattern(regexp = "^(https?://).*") String fileUrl
) {}
