package com.careerpilot.career.dto.request;

import jakarta.validation.constraints.*;

import java.util.UUID;

public record CreateUserProfileRequest(

        @NotNull(message = "userId is required")
        UUID userId,

        @Size(max = 200) String headline,
        @Size(max = 2000) String bio,
        @Size(max = 150) String location,
        @Size(max = 150) String targetRole,

        @Min(0) @Max(60) Integer yearsOfExperience,

        @Pattern(regexp = "^[+0-9 ()-]{7,20}$", message = "Phone number format is invalid")
        String phoneNumber,

        @Pattern(regexp = "^(https?://).*", message = "LinkedIn URL must start with http:// or https://")
        String linkedinUrl,

        @Pattern(regexp = "^(https?://).*", message = "GitHub URL must start with http:// or https://")
        String githubUrl,

        @Pattern(regexp = "^(https?://).*", message = "Portfolio URL must start with http:// or https://")
        String portfolioUrl
) {}
