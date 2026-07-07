package com.careerpilot.career.dto.response;

import com.careerpilot.career.domain.ResumeStatus;

import java.time.Instant;
import java.util.UUID;

public record ResumeResponse(
        UUID id, UUID userId, String title, String fileName, String fileUrl,
        Integer version, ResumeStatus status, boolean isDefault,
        Instant createdAt, Instant updatedAt
) {}
