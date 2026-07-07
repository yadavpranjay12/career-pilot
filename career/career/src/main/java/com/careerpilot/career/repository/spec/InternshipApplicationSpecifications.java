package com.careerpilot.career.repository.spec;

import com.careerpilot.career.domain.ApplicationStatus;
import com.careerpilot.career.domain.Company;
import com.careerpilot.career.domain.InternshipApplication;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.jpa.domain.Specification;

import java.util.UUID;

public final class InternshipApplicationSpecifications {

    private InternshipApplicationSpecifications() {}

    public static Specification<InternshipApplication> belongsToUser(UUID userId) {
        return (root, query, cb) -> cb.equal(root.get("userId"), userId);
    }

    public static Specification<InternshipApplication> hasStatus(ApplicationStatus status) {
        return (root, query, cb) ->
                status == null ? null : cb.equal(root.get("status"), status);
    }

    public static Specification<InternshipApplication> hasCompanyId(UUID companyId) {
        return (root, query, cb) ->
                companyId == null ? null : cb.equal(root.get("company").get("id"), companyId);
    }

    public static Specification<InternshipApplication> companyNameContains(String keyword) {
        return (root, query, cb) -> {
            if (keyword == null || keyword.isBlank()) {
                return null;
            }
            Join<InternshipApplication, Company> company = root.join("company", JoinType.INNER);
            return cb.like(cb.lower(company.get("name")), "%" + keyword.toLowerCase() + "%");
        };
    }
}
