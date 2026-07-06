package com.careerpilot.career.service.impl;

import com.careerpilot.career.domain.UserProfile;
import com.careerpilot.career.dto.request.CreateUserProfileRequest;
import com.careerpilot.career.dto.request.UpdateUserProfileRequest;
import com.careerpilot.career.dto.response.UserProfileResponse;
import com.careerpilot.career.exception.ProfileAlreadyExistsException;
import com.careerpilot.career.exception.ProfileNotFoundException;
import com.careerpilot.career.mapper.UserProfileMapper;
import com.careerpilot.career.repository.UserProfileRepository;
import com.careerpilot.career.service.UserProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserProfileServiceImpl implements UserProfileService {

    private final UserProfileRepository userProfileRepository;

    @Override
    @Transactional
    public UserProfileResponse createProfile(CreateUserProfileRequest request) {
        if (userProfileRepository.existsByUserId(request.userId())) {
            throw new ProfileAlreadyExistsException(request.userId());
        }

        UserProfile profile = UserProfile.builder()
                .userId(request.userId())
                .headline(request.headline())
                .bio(request.bio())
                .location(request.location())
                .targetRole(request.targetRole())
                .yearsOfExperience(request.yearsOfExperience())
                .phoneNumber(request.phoneNumber())
                .linkedinUrl(request.linkedinUrl())
                .githubUrl(request.githubUrl())
                .portfolioUrl(request.portfolioUrl())
                .build();

        return UserProfileMapper.toResponse(userProfileRepository.save(profile));
    }

    @Override
    @Transactional(readOnly = true)
    public UserProfileResponse getProfile(UUID userId) {
        return userProfileRepository.findByUserId(userId)
                .map(UserProfileMapper::toResponse)
                .orElseThrow(() -> new ProfileNotFoundException(userId));
    }

    @Override
    @Transactional
    public UserProfileResponse updateProfile(UUID userId, UpdateUserProfileRequest request) {
        UserProfile profile = userProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new ProfileNotFoundException(userId));

        profile.setHeadline(request.headline());
        profile.setBio(request.bio());
        profile.setLocation(request.location());
        profile.setTargetRole(request.targetRole());
        profile.setYearsOfExperience(request.yearsOfExperience());
        profile.setPhoneNumber(request.phoneNumber());
        profile.setLinkedinUrl(request.linkedinUrl());
        profile.setGithubUrl(request.githubUrl());
        profile.setPortfolioUrl(request.portfolioUrl());

        return UserProfileMapper.toResponse(userProfileRepository.save(profile));
    }
}
