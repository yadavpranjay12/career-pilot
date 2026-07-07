package com.careerpilot.career.dto.request;

import com.careerpilot.career.domain.InterviewResult;
import com.careerpilot.career.domain.InterviewRoundType;
import jakarta.validation.constraints.*;

import java.time.LocalDate;
import java.util.UUID;

public record CreateInterviewExperienceRequest(
        @NotNull(message = "userId is required") UUID userId,
        @NotNull(message = "companyId is required") UUID companyId,

        @NotBlank(message = "Role is required")
        @Size(max = 200) String role,

        @NotNull(message = "Interview round is required") InterviewRoundType interviewRound,

        InterviewResult result,

        @NotNull(message = "Interview date is required")
        @PastOrPresent(message = "Interview date cannot be in the future")
        LocalDate interviewDate,

        @Size(max = 5000) String experience,
        @Size(max = 2000) String tips,

        @Min(value = 1, message = "Difficulty rating must be between 1 and 5")
        @Max(value = 5, message = "Difficulty rating must be between 1 and 5")
        Integer difficultyRating
) {}
