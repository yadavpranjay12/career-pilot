package com.careerpilot.career.dto.request;

import com.careerpilot.career.domain.ProblemDifficulty;
import com.careerpilot.career.domain.ProblemStatus;
import jakarta.validation.constraints.*;

import java.time.LocalDate;
import java.util.UUID;

public record CreateProblemRequest(
        @NotNull(message = "userId is required") UUID userId,

        @NotBlank(message = "Title is required")
        @Size(max = 300) String title,

        @Size(max = 100) String platform,
        @Size(max = 100) String topic,

        @NotNull(message = "Difficulty is required") ProblemDifficulty difficulty,

        ProblemStatus status,

        @Size(max = 4000) String notes,

        @Pattern(regexp = "^(https?://).*", message = "Solution URL must start with http:// or https://")
        String solutionUrl,

        LocalDate solvedDate,
        LocalDate nextRevisionDate
) {}
