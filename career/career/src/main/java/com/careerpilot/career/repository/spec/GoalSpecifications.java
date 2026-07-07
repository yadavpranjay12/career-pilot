package com.careerpilot.career.repository.spec;

import com.careerpilot.career.domain.Goal;
import com.careerpilot.career.domain.GoalStatus;
import com.careerpilot.career.domain.GoalType;
import org.springframework.data.jpa.domain.Specification;

import java.util.UUID;

public final class GoalSpecifications {

    private GoalSpecifications() {}

    public static Specification<Goal> belongsToUser(UUID userId) {
        return (root, query, cb) -> cb.equal(root.get("userId"), userId);
    }

    public static Specification<Goal> hasStatus(GoalStatus status) {
        return (root, query, cb) -> status == null ? null : cb.equal(root.get("status"), status);
    }

    public static Specification<Goal> hasType(GoalType type) {
        return (root, query, cb) -> type == null ? null : cb.equal(root.get("type"), type);
    }
}
