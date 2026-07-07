package com.careerpilot.career.dto.response;

import com.careerpilot.career.domain.InterviewResult;
import com.careerpilot.career.domain.InterviewRoundType;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

public record InterviewExperienceResponse(
        UUID id, UUID userId, UUID companyId, String companyName, String role,
        InterviewRoundType interviewRound, InterviewResult result, LocalDate interviewDate,
        String experience, String tips, Integer difficultyRating,
        Instant createdAt, Instant updatedAt
) {}
