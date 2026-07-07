package com.careerpilot.career.dto.response;

import com.careerpilot.career.domain.ApplicationStatus;
import com.careerpilot.career.domain.WorkMode;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

public record InternshipApplicationResponse(
        UUID id,
        UUID userId,
        UUID companyId,
        String companyName,
        String jobTitle,
        String applicationUrl,
        LocalDate applicationDate,
        LocalDate deadline,
        ApplicationStatus status,
        String notes,
        BigDecimal salaryOffered,
        String location,
        WorkMode workMode,
        Instant createdAt,
        Instant updatedAt
) {}
