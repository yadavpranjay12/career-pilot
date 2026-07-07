package com.careerpilot.career.dto.request;

import jakarta.validation.constraints.PastOrPresent;

import java.time.LocalDate;

public record CompleteProblemRequest(
        @PastOrPresent(message = "Solved date cannot be in the future")
        LocalDate solvedDate
) {}
