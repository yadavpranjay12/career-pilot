package com.careerpilot.career.dto.response;

import com.careerpilot.career.domain.ApplicationStatus;

import java.util.Map;

public record DashboardResponse(
        long totalCompanies,
        long totalApplications,
        Map<ApplicationStatus, Long> applicationsByStatus,
        long totalProblemsSolved,
        long activeGoals,
        long completedGoals,
        double acceptanceRate,
        long offerCount
) {}
