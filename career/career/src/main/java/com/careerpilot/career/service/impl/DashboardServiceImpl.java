package com.careerpilot.career.service.impl;

import com.careerpilot.career.domain.ApplicationStatus;
import com.careerpilot.career.domain.GoalStatus;
import com.careerpilot.career.domain.ProblemStatus;
import com.careerpilot.career.dto.response.DashboardResponse;
import com.careerpilot.career.repository.*;
import com.careerpilot.career.repository.projection.ApplicationStatusCount;
import com.careerpilot.career.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.EnumMap;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final CompanyRepository companyRepository;
    private final InternshipApplicationRepository applicationRepository;
    private final ProblemRepository problemRepository;
    private final GoalRepository goalRepository;
    private final InterviewExperienceRepository experienceRepository;

    @Override
    @Transactional(readOnly = true)
    public DashboardResponse getDashboard(UUID userId) {
        Map<ApplicationStatus, Long> applicationsByStatus = new EnumMap<>(ApplicationStatus.class);
        for (ApplicationStatusCount row : applicationRepository.countByStatusForUser(userId)) {
            applicationsByStatus.put(row.getStatus(), row.getCount());
        }

        long totalApplications = applicationsByStatus.values().stream().mapToLong(Long::longValue).sum();
        long offerCount = applicationsByStatus.getOrDefault(ApplicationStatus.OFFER, 0L);
        long interviewCount = applicationsByStatus.getOrDefault(ApplicationStatus.INTERVIEW, 0L);

        // THE FIX: Grab the email directly from the JWT Security Context
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        return new DashboardResponse(
                companyRepository.countByUserId(userEmail), // <-- Pass the exact email to the repo!
                totalApplications,
                applicationsByStatus,
                problemRepository.countByUserIdAndStatus(userId, ProblemStatus.COMPLETED),
                goalRepository.countByUserIdAndStatus(userId, GoalStatus.ACTIVE),
                goalRepository.countByUserIdAndStatus(userId, GoalStatus.COMPLETED),
                experienceRepository.countByUserId(userId),
                offerCount
        );
    }
}
