package com.careerpilot.career.service.impl;

import com.careerpilot.career.domain.Company;
import com.careerpilot.career.domain.InterviewExperience;
import com.careerpilot.career.domain.InterviewResult;
import com.careerpilot.career.domain.InterviewRoundType;
import com.careerpilot.career.dto.request.CreateInterviewExperienceRequest;
import com.careerpilot.career.dto.request.UpdateInterviewExperienceRequest;
import com.careerpilot.career.dto.response.InterviewExperienceResponse;
import com.careerpilot.career.exception.CompanyNotFoundException;
import com.careerpilot.career.exception.InterviewExperienceNotFoundException;
import com.careerpilot.career.mapper.InterviewExperienceMapper;
import com.careerpilot.career.repository.CompanyRepository;
import com.careerpilot.career.repository.InterviewExperienceRepository;
import com.careerpilot.career.repository.spec.InterviewExperienceSpecifications;
import com.careerpilot.career.service.InterviewExperienceService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class InterviewExperienceServiceImpl implements InterviewExperienceService {

    private final InterviewExperienceRepository experienceRepository;
    private final CompanyRepository companyRepository;

    @Override
    @Transactional
    public InterviewExperienceResponse createExperience(CreateInterviewExperienceRequest request) {
        Company company = companyRepository.findById(request.companyId())
                .orElseThrow(() -> new CompanyNotFoundException(request.companyId()));

        InterviewExperience experience = InterviewExperience.builder()
                .userId(request.userId())
                .company(company)
                .role(request.role())
                .interviewRound(request.interviewRound())
                .result(request.result() != null ? request.result() : InterviewResult.PENDING)
                .interviewDate(request.interviewDate())
                .experience(request.experience())
                .tips(request.tips())
                .difficultyRating(request.difficultyRating())
                .build();

        return InterviewExperienceMapper.toResponse(experienceRepository.save(experience));
    }

    @Override
    @Transactional(readOnly = true)
    public InterviewExperienceResponse getExperience(UUID id) {
        return experienceRepository.findById(id)
                .map(InterviewExperienceMapper::toResponse)
                .orElseThrow(() -> new InterviewExperienceNotFoundException(id));
    }

    @Override
    @Transactional
    public InterviewExperienceResponse updateExperience(UUID id, UpdateInterviewExperienceRequest request) {
        InterviewExperience experience = experienceRepository.findById(id)
                .orElseThrow(() -> new InterviewExperienceNotFoundException(id));

        experience.setRole(request.role());
        experience.setInterviewRound(request.interviewRound());
        experience.setResult(request.result());
        experience.setInterviewDate(request.interviewDate());
        experience.setExperience(request.experience());
        experience.setTips(request.tips());
        experience.setDifficultyRating(request.difficultyRating());

        return InterviewExperienceMapper.toResponse(experienceRepository.save(experience));
    }

    @Override
    @Transactional
    public void deleteExperience(UUID id) {
        if (!experienceRepository.existsById(id)) {
            throw new InterviewExperienceNotFoundException(id);
        }
        experienceRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<InterviewExperienceResponse> getExperiences(UUID userId, Pageable pageable) {
        return experienceRepository.findByUserId(userId, pageable).map(InterviewExperienceMapper::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<InterviewExperienceResponse> searchExperiences(
            UUID userId, String companyName, InterviewRoundType round, InterviewResult result, Pageable pageable) {

        Specification<InterviewExperience> spec = Specification
                .where(InterviewExperienceSpecifications.belongsToUser(userId))
                .and(InterviewExperienceSpecifications.companyNameContains(companyName))
                .and(InterviewExperienceSpecifications.hasRound(round))
                .and(InterviewExperienceSpecifications.hasResult(result));

        return experienceRepository.findAll(spec, pageable).map(InterviewExperienceMapper::toResponse);
    }
}
