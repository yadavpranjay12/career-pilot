package com.careerpilot.career.service;

import com.careerpilot.career.dto.request.CreateUserProfileRequest;
import com.careerpilot.career.dto.request.UpdateUserProfileRequest;
import com.careerpilot.career.dto.response.UserProfileResponse;

import java.util.UUID;

public interface UserProfileService {
    UserProfileResponse createProfile(CreateUserProfileRequest request);
    UserProfileResponse getProfile(UUID userId);
    UserProfileResponse updateProfile(UUID userId, UpdateUserProfileRequest request);
}
