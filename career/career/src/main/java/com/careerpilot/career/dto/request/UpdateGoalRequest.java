package com.careerpilot.career.dto.request;

import com.careerpilot.career.domain.GoalType;
import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record UpdateGoalRequest(
        @NotBlank @Size(max = 200) String title,
        @Size(max = 2000) String description,
        @NotNull @Positive(message = "Target count must be greater than zero") Integer targetCount,
        LocalDate targetDate,
        @NotNull(message = "Goal type is required") GoalType type
) {}
