package com.careerpilot.career.dto.response;

import com.careerpilot.career.domain.CompanySize;

import java.time.Instant;
import java.util.UUID;

public record CompanyResponse(
        UUID id,
        String name,
        String industry,
        String website,
        String description,
        CompanySize size,
        String location,
        String careerPageUrl,
        String applicationUrl,
        boolean isHiring,
        Instant createdAt,
        Instant updatedAt
) {}
