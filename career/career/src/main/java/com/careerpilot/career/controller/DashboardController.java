package com.careerpilot.career.controller;

import com.careerpilot.career.dto.response.DashboardResponse;
import com.careerpilot.career.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/api/dashboard")
    public ResponseEntity<DashboardResponse> getDashboard(@RequestParam UUID userId) {
        return ResponseEntity.ok(dashboardService.getDashboard(userId));
    }
}
