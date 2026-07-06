package com.careerpilot.career.service.impl;

import com.careerpilot.career.domain.Company;
import com.careerpilot.career.domain.CompanySize;
import com.careerpilot.career.dto.request.CreateCompanyRequest;
import com.careerpilot.career.dto.request.UpdateCompanyRequest;
import com.careerpilot.career.dto.response.CompanyResponse;
import com.careerpilot.career.exception.CompanyAlreadyExistsException;
import com.careerpilot.career.exception.CompanyNotFoundException;
import com.careerpilot.career.mapper.CompanyMapper;
import com.careerpilot.career.repository.CompanyRepository;
import com.careerpilot.career.repository.spec.CompanySpecifications;
import com.careerpilot.career.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {

    private final CompanyRepository companyRepository;

    @Override
    @Transactional
    public CompanyResponse createCompany(CreateCompanyRequest request) {
        if (companyRepository.existsByNameIgnoreCase(request.name())) {
            throw new CompanyAlreadyExistsException(request.name());
        }

        Company company = Company.builder()
                .name(request.name())
                .industry(request.industry())
                .website(request.website())
                .description(request.description())
                .size(request.size())
                .location(request.location())
                .careerPageUrl(request.careerPageUrl())
                .applicationUrl(request.applicationUrl())
                .isHiring(request.isHiring())
                .build();
// inside updateCompany(), after the existing setters:
        company.setCareerPageUrl(request.careerPageUrl());
        company.setApplicationUrl(request.applicationUrl());
        company.setHiring(request.isHiring());

        return CompanyMapper.toResponse(companyRepository.save(company));
    }

    @Override
    @Transactional(readOnly = true)
    public CompanyResponse getCompany(UUID id) {
        return companyRepository.findById(id)
                .map(CompanyMapper::toResponse)
                .orElseThrow(() -> new CompanyNotFoundException(id));
    }

    @Override
    @Transactional
    public CompanyResponse updateCompany(UUID id, UpdateCompanyRequest request) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new CompanyNotFoundException(id));

        company.setName(request.name());
        company.setIndustry(request.industry());
        company.setWebsite(request.website());
        company.setDescription(request.description());
        company.setSize(request.size());
        company.setLocation(request.location());

        return CompanyMapper.toResponse(companyRepository.save(company));
    }

    @Override
    @Transactional
    public void deleteCompany(UUID id) {
        if (!companyRepository.existsById(id)) {
            throw new CompanyNotFoundException(id);
        }
        companyRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<CompanyResponse> listCompanies(Pageable pageable) {
        return companyRepository.findAll(pageable).map(CompanyMapper::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<CompanyResponse> searchCompanies(String keyword, String industry, CompanySize size, Pageable pageable) {
        Specification<Company> spec = Specification
                .where(CompanySpecifications.nameContains(keyword))
                .and(CompanySpecifications.hasIndustry(industry))
                .and(CompanySpecifications.hasSize(size));

        return companyRepository.findAll(spec, pageable).map(CompanyMapper::toResponse);
    }
}
