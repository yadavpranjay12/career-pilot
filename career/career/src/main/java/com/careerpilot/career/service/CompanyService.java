package com.careerpilot.career.service;

import com.careerpilot.career.domain.CompanySize;
import com.careerpilot.career.dto.request.CreateCompanyRequest;
import com.careerpilot.career.dto.request.UpdateCompanyRequest;
import com.careerpilot.career.dto.response.CompanyResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface CompanyService {
    CompanyResponse createCompany(UUID userId, CreateCompanyRequest request);

    CompanyResponse getCompany(UUID id, UUID userId);

    CompanyResponse updateCompany(UUID id, UUID userId, UpdateCompanyRequest request);

    void deleteCompany(UUID id, UUID userId);

    Page<CompanyResponse> listCompanies(UUID userId, Pageable pageable);

    Page<CompanyResponse> searchCompanies(
            UUID userId,
            String keyword,
            String industry,
            CompanySize size,
            Boolean isHiring,
            Pageable pageable
    );
}

