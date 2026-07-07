package com.careerpilot.career.mapper;

import com.careerpilot.career.domain.Goal;
import com.careerpilot.career.dto.response.GoalResponse;

public final class GoalMapper {

    private GoalMapper() {}

    public static GoalResponse toResponse(Goal goal) {
        return new GoalResponse(
                goal.getId(), goal.getUserId(), goal.getTitle(), goal.getDescription(),
                goal.getTargetCount(), goal.getCompletedCount(), goal.getTargetDate(),
                goal.getStatus(), goal.getType(), goal.getCreatedAt(), goal.getUpdatedAt()
        );
    }
}
