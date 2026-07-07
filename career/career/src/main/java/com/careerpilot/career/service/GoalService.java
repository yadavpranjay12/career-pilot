package com.careerpilot.career.service;

import com.careerpilot.career.domain.GoalStatus;
import com.careerpilot.career.domain.GoalType;
import com.careerpilot.career.dto.request.CreateGoalRequest;
import com.careerpilot.career.dto.request.UpdateGoalProgressRequest;
import com.careerpilot.career.dto.request.UpdateGoalRequest;
import com.careerpilot.career.dto.response.GoalResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface GoalService {
    GoalResponse createGoal(CreateGoalRequest request);
    GoalResponse getGoal(UUID id);
    GoalResponse updateGoal(UUID id, UpdateGoalRequest request);
    void deleteGoal(UUID id);
    Page<GoalResponse> getGoals(UUID userId, Pageable pageable);
    Page<GoalResponse> filterGoals(UUID userId, GoalStatus status, GoalType type, Pageable pageable);
    GoalResponse updateProgress(UUID id, UpdateGoalProgressRequest request);
    GoalResponse cancelGoal(UUID id);
}
