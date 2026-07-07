package com.careerpilot.career.service;

import com.careerpilot.career.domain.InterviewResult;
import com.careerpilot.career.domain.InterviewRoundType;
import com.careerpilot.career.dto.request.CreateInterviewExperienceRequest;
import com.careerpilot.career.dto.request.UpdateInterviewExperienceRequest;
import com.careerpilot.career.dto.response.InterviewExperienceResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface InterviewExperienceService {
    InterviewExperienceResponse createExperience(CreateInterviewExperienceRequest request);
    InterviewExperienceResponse getExperience(UUID id);
    InterviewExperienceResponse updateExperience(UUID id, UpdateInterviewExperienceRequest request);
    void deleteExperience(UUID id);
    Page<InterviewExperienceResponse> getExperiences(UUID userId, Pageable pageable);
    Page<InterviewExperienceResponse> searchExperiences(
            UUID userId, String companyName, InterviewRoundType round, InterviewResult result, Pageable pageable
    );
}
