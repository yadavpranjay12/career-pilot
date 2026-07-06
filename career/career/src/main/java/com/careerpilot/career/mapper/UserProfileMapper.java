package com.careerpilot.career.mapper;

import com.careerpilot.career.domain.UserProfile;
import com.careerpilot.career.dto.response.UserProfileResponse;

public final class UserProfileMapper {
    private UserProfileMapper() {}

    public static UserProfileResponse toResponse(UserProfile profile) {
        return new UserProfileResponse(
                profile.getId(), profile.getUserId(), profile.getHeadline(), profile.getBio(),
                profile.getLocation(), profile.getTargetRole(), profile.getYearsOfExperience(),
                profile.getPhoneNumber(), profile.getLinkedinUrl(), profile.getGithubUrl(),
                profile.getPortfolioUrl(), profile.getCreatedAt(), profile.getUpdatedAt()
        );
    }
}
