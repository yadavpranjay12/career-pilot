package com.careerpilot.career.dto.request;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record ScheduleRevisionRequest(
        @NotNull(message = "Next revision date is required")
        LocalDate nextRevisionDate
) {}
