package com.careerpilot.career.service.impl;

import com.careerpilot.career.domain.Goal;
import com.careerpilot.career.domain.GoalStatus;
import com.careerpilot.career.domain.GoalType;
import com.careerpilot.career.dto.request.CreateGoalRequest;
import com.careerpilot.career.dto.request.UpdateGoalProgressRequest;
import com.careerpilot.career.dto.request.UpdateGoalRequest;
import com.careerpilot.career.dto.response.GoalResponse;
import com.careerpilot.career.exception.GoalNotFoundException;
import com.careerpilot.career.exception.InvalidGoalProgressException;
import com.careerpilot.career.mapper.GoalMapper;
import com.careerpilot.career.repository.GoalRepository;
import com.careerpilot.career.repository.spec.GoalSpecifications;
import com.careerpilot.career.service.GoalService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GoalServiceImpl implements GoalService {

    private final GoalRepository goalRepository;

    @Override
    @Transactional
    public GoalResponse createGoal(CreateGoalRequest request) {
        Goal goal = Goal.builder()
                .userId(request.userId())
                .title(request.title())
                .description(request.description())
                .targetCount(request.targetCount())
                .completedCount(0)
                .targetDate(request.targetDate())
                .status(GoalStatus.ACTIVE)
                .type(request.type())
                .build();

        return GoalMapper.toResponse(goalRepository.save(goal));
    }

    @Override
    @Transactional(readOnly = true)
    public GoalResponse getGoal(UUID id) {
        return goalRepository.findById(id)
                .map(GoalMapper::toResponse)
                .orElseThrow(() -> new GoalNotFoundException(id));
    }

    @Override
    @Transactional
    public GoalResponse updateGoal(UUID id, UpdateGoalRequest request) {
        Goal goal = goalRepository.findById(id)
                .orElseThrow(() -> new GoalNotFoundException(id));

        requireEditable(goal);

        goal.setTitle(request.title());
        goal.setDescription(request.description());
        goal.setTargetDate(request.targetDate());
        goal.setType(request.type());

        // targetCount can shrink/grow, but never below what's already completed
        if (request.targetCount() < goal.getCompletedCount()) {
            throw new InvalidGoalProgressException(
                    "Target count (" + request.targetCount() + ") cannot be less than completed count (" + goal.getCompletedCount() + ")"
            );
        }
        goal.setTargetCount(request.targetCount());
        recomputeStatus(goal);

        return GoalMapper.toResponse(goalRepository.save(goal));
    }

    @Override
    @Transactional
    public void deleteGoal(UUID id) {
        if (!goalRepository.existsById(id)) {
            throw new GoalNotFoundException(id);
        }
        goalRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<GoalResponse> getGoals(UUID userId, Pageable pageable) {
        return goalRepository.findByUserId(userId, pageable).map(GoalMapper::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<GoalResponse> filterGoals(UUID userId, GoalStatus status, GoalType type, Pageable pageable) {
        Specification<Goal> spec = Specification
                .where(GoalSpecifications.belongsToUser(userId))
                .and(GoalSpecifications.hasStatus(status))
                .and(GoalSpecifications.hasType(type));

        return goalRepository.findAll(spec, pageable).map(GoalMapper::toResponse);
    }

    @Override
    @Transactional
    public GoalResponse updateProgress(UUID id, UpdateGoalProgressRequest request) {
        Goal goal = goalRepository.findById(id)
                .orElseThrow(() -> new GoalNotFoundException(id));

        requireEditable(goal);

        if (request.completedCount() > goal.getTargetCount()) {
            throw new InvalidGoalProgressException(
                    "Completed count (" + request.completedCount() + ") cannot exceed target count (" + goal.getTargetCount() + ")"
            );
        }

        goal.setCompletedCount(request.completedCount());
        recomputeStatus(goal);

        return GoalMapper.toResponse(goalRepository.save(goal));
    }

    @Override
    @Transactional
    public GoalResponse cancelGoal(UUID id) {
        Goal goal = goalRepository.findById(id)
                .orElseThrow(() -> new GoalNotFoundException(id));

        requireEditable(goal);

        goal.setStatus(GoalStatus.CANCELLED);

        return GoalMapper.toResponse(goalRepository.save(goal));
    }

    private void requireEditable(Goal goal) {
        if (goal.getStatus() != GoalStatus.ACTIVE) {
            throw new InvalidGoalProgressException(
                    "Goal " + goal.getId() + " is " + goal.getStatus() + " and can no longer be modified"
            );
        }
    }

    private void recomputeStatus(Goal goal) {
        if (goal.getCompletedCount().equals(goal.getTargetCount())) {
            goal.setStatus(GoalStatus.COMPLETED);
        }
    }
}
