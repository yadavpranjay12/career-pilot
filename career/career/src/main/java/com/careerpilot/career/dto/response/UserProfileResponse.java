package com.careerpilot.career.dto.response;

import java.time.Instant;
import java.util.UUID;

public record UserProfileResponse(
        UUID id,
        UUID userId,
        String headline,
        String bio,
        String location,
        String targetRole,
        Integer yearsOfExperience,
        String phoneNumber,
        String linkedinUrl,
        String githubUrl,
        String portfolioUrl,
        Instant createdAt,
        Instant updatedAt
) {}
