package com.careerpilot.career.repository.spec;

import com.careerpilot.career.domain.Company;
import com.careerpilot.career.domain.CompanySize;
import org.springframework.data.jpa.domain.Specification;

import java.util.UUID;

public final class CompanySpecifications {

    private CompanySpecifications() {}

    // NEW: Ensure we only search within companies owned by this user
    public static Specification<Company> belongsToUser(UUID userId) {
        return (root, query, cb) -> cb.equal(root.get("userId"), userId);
    }

    public static Specification<Company> nameContains(String keyword) {
        return (root, query, cb) ->
                keyword == null || keyword.isBlank()
                        ? null
                        : cb.like(cb.lower(root.get("name")), "%" + keyword.toLowerCase() + "%");
    }

    public static Specification<Company> hasIndustry(String industry) {
        return (root, query, cb) ->
                industry == null || industry.isBlank()
                        ? null
                        : cb.equal(cb.lower(root.get("industry")), industry.toLowerCase());
    }

    public static Specification<Company> hasSize(CompanySize size) {
        return (root, query, cb) ->
                size == null ? null : cb.equal(root.get("size"), size);
    }

    public static Specification<Company> isHiring(Boolean isHiring) {
        return (root, query, cb) ->
                isHiring == null
                        ? null
                        : cb.equal(root.get("isHiring"), isHiring);
    }
}