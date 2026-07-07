package com.careerpilot.career.dto.request;

import com.careerpilot.career.domain.GoalType;
import jakarta.validation.constraints.*;

import java.time.LocalDate;
import java.util.UUID;

public record CreateGoalRequest(
        @NotNull(message = "userId is required") UUID userId,

        @NotBlank(message = "Title is required")
        @Size(max = 200) String title,

        @Size(max = 2000) String description,

        @NotNull(message = "Target count is required")
        @Positive(message = "Target count must be greater than zero")
        Integer targetCount,

        LocalDate targetDate,

        @NotNull(message = "Goal type is required") GoalType type
) {}
