package com.careerpilot.career.repository.spec;

import com.careerpilot.career.domain.Company;
import com.careerpilot.career.domain.InterviewExperience;
import com.careerpilot.career.domain.InterviewResult;
import com.careerpilot.career.domain.InterviewRoundType;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.jpa.domain.Specification;

import java.util.UUID;

public final class InterviewExperienceSpecifications {

    private InterviewExperienceSpecifications() {}

    public static Specification<InterviewExperience> belongsToUser(UUID userId) {
        return (root, query, cb) -> cb.equal(root.get("userId"), userId);
    }

    public static Specification<InterviewExperience> hasRound(InterviewRoundType round) {
        return (root, query, cb) -> round == null ? null : cb.equal(root.get("interviewRound"), round);
    }

    public static Specification<InterviewExperience> hasResult(InterviewResult result) {
        return (root, query, cb) -> result == null ? null : cb.equal(root.get("result"), result);
    }

    public static Specification<InterviewExperience> companyNameContains(String keyword) {
        return (root, query, cb) -> {
            if (keyword == null || keyword.isBlank()) return null;
            Join<InterviewExperience, Company> company = root.join("company", JoinType.INNER);
            return cb.like(cb.lower(company.get("name")), "%" + keyword.toLowerCase() + "%");
        };
    }
}
