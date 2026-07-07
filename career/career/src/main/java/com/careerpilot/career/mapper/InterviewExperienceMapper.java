package com.careerpilot.career.mapper;

import com.careerpilot.career.domain.InterviewExperience;
import com.careerpilot.career.dto.response.InterviewExperienceResponse;

public final class InterviewExperienceMapper {

    private InterviewExperienceMapper() {}

    public static InterviewExperienceResponse toResponse(InterviewExperience experience) {
        return new InterviewExperienceResponse(
                experience.getId(), experience.getUserId(), experience.getCompany().getId(),
                experience.getCompany().getName(), experience.getRole(), experience.getInterviewRound(),
                experience.getResult(), experience.getInterviewDate(), experience.getExperience(),
                experience.getTips(), experience.getDifficultyRating(),
                experience.getCreatedAt(), experience.getUpdatedAt()
        );
    }
}
