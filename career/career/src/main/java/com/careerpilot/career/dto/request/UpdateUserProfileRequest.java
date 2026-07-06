package com.careerpilot.career.dto.request;

import jakarta.validation.constraints.*;

public record UpdateUserProfileRequest(
        @Size(max = 200) String headline,
        @Size(max = 2000) String bio,
        @Size(max = 150) String location,
        @Size(max = 150) String targetRole,
        @Min(0) @Max(60) Integer yearsOfExperience,
        @Pattern(regexp = "^[+0-9 ()-]{7,20}$") String phoneNumber,
        @Pattern(regexp = "^(https?://).*") String linkedinUrl,
        @Pattern(regexp = "^(https?://).*") String githubUrl,
        @Pattern(regexp = "^(https?://).*") String portfolioUrl
) {}
