package com.careerpilot.career.repository.spec;

import com.careerpilot.career.domain.Problem;
import com.careerpilot.career.domain.ProblemDifficulty;
import com.careerpilot.career.domain.ProblemStatus;
import org.springframework.data.jpa.domain.Specification;

import java.util.UUID;

public final class ProblemSpecifications {

    private ProblemSpecifications() {}

    public static Specification<Problem> belongsToUser(UUID userId) {
        return (root, query, cb) -> cb.equal(root.get("userId"), userId);
    }

    public static Specification<Problem> hasTopic(String topic) {
        return (root, query, cb) ->
                topic == null || topic.isBlank() ? null : cb.equal(cb.lower(root.get("topic")), topic.toLowerCase());
    }

    public static Specification<Problem> hasDifficulty(ProblemDifficulty difficulty) {
        return (root, query, cb) -> difficulty == null ? null : cb.equal(root.get("difficulty"), difficulty);
    }

    public static Specification<Problem> hasStatus(ProblemStatus status) {
        return (root, query, cb) -> status == null ? null : cb.equal(root.get("status"), status);
    }

    public static Specification<Problem> titleContains(String keyword) {
        return (root, query, cb) ->
                keyword == null || keyword.isBlank()
                        ? null
                        : cb.like(cb.lower(root.get("title")), "%" + keyword.toLowerCase() + "%");
    }
}
