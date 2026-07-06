package com.careerpilot.career.mapper;

import com.careerpilot.career.domain.Company;
import com.careerpilot.career.dto.response.CompanyResponse;

public final class CompanyMapper {
    private CompanyMapper() {}

    public static CompanyResponse toResponse(Company company) {
        return new CompanyResponse(
                company.getId(), company.getName(), company.getIndustry(), company.getWebsite(),
                company.getDescription(), company.getSize(), company.getLocation(),
                company.getCareerPageUrl(), company.getApplicationUrl(), company.isHiring(),
                company.getCreatedAt(), company.getUpdatedAt()
        );
    }
}
