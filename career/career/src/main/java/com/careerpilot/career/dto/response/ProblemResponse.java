package com.careerpilot.career.dto.response;

import com.careerpilot.career.domain.ProblemDifficulty;
import com.careerpilot.career.domain.ProblemStatus;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

public record ProblemResponse(
        UUID id, UUID userId, String title, String platform, String topic,
        ProblemDifficulty difficulty, ProblemStatus status, String notes, String solutionUrl,
        LocalDate solvedDate, Integer revisionCount, LocalDate nextRevisionDate,
        Instant createdAt, Instant updatedAt
) {}
