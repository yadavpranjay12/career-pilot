package com.careerpilot.career.dto.request;

import com.careerpilot.career.domain.ProblemDifficulty;
import com.careerpilot.career.domain.ProblemStatus;
import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record UpdateProblemRequest(
        @NotBlank @Size(max = 300) String title,
        @Size(max = 100) String platform,
        @Size(max = 100) String topic,
        @NotNull(message = "Difficulty is required") ProblemDifficulty difficulty,
        @NotNull(message = "Status is required") ProblemStatus status,
        @Size(max = 4000) String notes,
        @Pattern(regexp = "^(https?://).*") String solutionUrl,
        LocalDate solvedDate,
        LocalDate nextRevisionDate
) {}
