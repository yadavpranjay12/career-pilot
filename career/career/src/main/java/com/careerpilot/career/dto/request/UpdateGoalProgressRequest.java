package com.careerpilot.career.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record UpdateGoalProgressRequest(
        @NotNull(message = "Completed count is required")
        @PositiveOrZero(message = "Completed count cannot be negative")
        Integer completedCount
) {}
