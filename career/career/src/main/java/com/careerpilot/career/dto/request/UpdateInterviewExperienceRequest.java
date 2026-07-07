package com.careerpilot.career.dto.request;

import com.careerpilot.career.domain.InterviewResult;
import com.careerpilot.career.domain.InterviewRoundType;
import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record UpdateInterviewExperienceRequest(
        @NotBlank @Size(max = 200) String role,
        @NotNull(message = "Interview round is required") InterviewRoundType interviewRound,
        @NotNull(message = "Result is required") InterviewResult result,

        @NotNull @PastOrPresent(message = "Interview date cannot be in the future")
        LocalDate interviewDate,

        @Size(max = 5000) String experience,
        @Size(max = 2000) String tips,

        @Min(1) @Max(5) Integer difficultyRating
) {}
