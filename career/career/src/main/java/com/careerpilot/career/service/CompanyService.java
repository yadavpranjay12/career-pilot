package com.careerpilot.career.service;

import com.careerpilot.career.domain.CompanySize;
import com.careerpilot.career.dto.request.CreateCompanyRequest;
import com.careerpilot.career.dto.request.UpdateCompanyRequest;
import com.careerpilot.career.dto.response.CompanyResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface CompanyService {
    CompanyResponse createCompany(CreateCompanyRequest request);
    CompanyResponse getCompany(UUID id);
    CompanyResponse updateCompany(UUID id, UpdateCompanyRequest request);
    void deleteCompany(UUID id);
    Page<CompanyResponse> listCompanies(Pageable pageable);
    Page<CompanyResponse> searchCompanies(
            String keyword,
            String industry,
            CompanySize size,
            Boolean isHiring,
            Pageable pageable
    );
}
