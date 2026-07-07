package com.careerpilot.career.service;

import com.careerpilot.career.dto.response.DashboardResponse;

import java.util.UUID;

public interface DashboardService {
    DashboardResponse getDashboard(UUID userId);
}
