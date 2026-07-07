package com.careerpilot.career.dto.response;

import com.careerpilot.career.domain.GoalStatus;
import com.careerpilot.career.domain.GoalType;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

public record GoalResponse(
        UUID id, UUID userId, String title, String description,
        Integer targetCount, Integer completedCount, LocalDate targetDate,
        GoalStatus status, GoalType type, Instant createdAt, Instant updatedAt
) {}
