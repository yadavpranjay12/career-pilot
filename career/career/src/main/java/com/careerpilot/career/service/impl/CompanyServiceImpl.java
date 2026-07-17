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
    public CompanyResponse createCompany(String userId, CreateCompanyRequest request) {
        // Scoped to check if THIS user already created a company with this name
        if (companyRepository.existsByNameIgnoreCaseAndUserId(request.name(), userId)) {
            throw new CompanyAlreadyExistsException(request.name());
        }

        Company company = Company.builder()
                .userId(userId) // <-- Link the company to the logged-in user
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

        return CompanyMapper.toResponse(companyRepository.save(company));
    }

    @Override
    @Transactional(readOnly = true)
    public CompanyResponse getCompany(UUID id, String userId) {
        // Only fetch if the ID matches AND it belongs to the user
        return companyRepository.findByIdAndUserId(id, userId)
                .map(CompanyMapper::toResponse)
                .orElseThrow(() -> new CompanyNotFoundException(id));
    }

    @Override
    @Transactional
    public CompanyResponse updateCompany(UUID id, String userId, UpdateCompanyRequest request) {
        // Only allow update if it belongs to the user
        Company company = companyRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new CompanyNotFoundException(id));

        company.setName(request.name());
        company.setIndustry(request.industry());
        company.setWebsite(request.website());
        company.setDescription(request.description());
        company.setSize(request.size());
        company.setLocation(request.location());
        company.setCareerPageUrl(request.careerPageUrl());
        company.setApplicationUrl(request.applicationUrl());
        company.setHiring(request.isHiring());

        return CompanyMapper.toResponse(companyRepository.save(company));
    }

    @Override
    @Transactional
    public void deleteCompany(UUID id, String userId) {
        // Only allow delete if it belongs to the user
        if (!companyRepository.existsByIdAndUserId(id, userId)) {
            throw new CompanyNotFoundException(id);
        }
        companyRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<CompanyResponse> listCompanies(String userId, Pageable pageable) {
        // Scope the list to the logged-in user
        return companyRepository.findAllByUserId(userId, pageable)
                .map(CompanyMapper::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<CompanyResponse> searchCompanies(
            String userId,
            String keyword,
            String industry,
            CompanySize size,
            Boolean isHiring,
            Pageable pageable
    ) {
        // Add a specification to ensure we only search within the user's companies
        Specification<Company> spec = Specification.allOf(
                CompanySpecifications.belongsToUser(userId), // <-- New specification method needed!
                CompanySpecifications.nameContains(keyword),
                CompanySpecifications.hasIndustry(industry),
                CompanySpecifications.hasSize(size),
                CompanySpecifications.isHiring(isHiring)
        );

        return companyRepository
                .findAll(spec, pageable)
                .map(CompanyMapper::toResponse);
    }
}
