package com.careerpilot.career.service.impl;

import com.careerpilot.career.domain.ApplicationStatus;
import com.careerpilot.career.domain.Company;
import com.careerpilot.career.domain.InternshipApplication;
import com.careerpilot.career.dto.request.CreateInternshipApplicationRequest;
import com.careerpilot.career.dto.request.UpdateInternshipApplicationRequest;
import com.careerpilot.career.dto.response.InternshipApplicationResponse;
import com.careerpilot.career.exception.*;
import com.careerpilot.career.mapper.InternshipApplicationMapper;
import com.careerpilot.career.repository.CompanyRepository;
import com.careerpilot.career.repository.InternshipApplicationRepository;
import com.careerpilot.career.repository.spec.InternshipApplicationSpecifications;
import com.careerpilot.career.service.InternshipApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class InternshipApplicationServiceImpl implements InternshipApplicationService {

    private final InternshipApplicationRepository applicationRepository;
    private final CompanyRepository companyRepository;

    @Override
    @Transactional
    public InternshipApplicationResponse createApplication(CreateInternshipApplicationRequest request) {
        Company company = companyRepository.findById(request.companyId())
                .orElseThrow(() -> new CompanyNotFoundException(request.companyId()));

        if (applicationRepository.existsByUserIdAndCompanyIdAndJobTitleIgnoreCase(
                request.userId(), request.companyId(), request.jobTitle())) {
            throw new DuplicateApplicationException(request.companyId(), request.jobTitle());
        }

        validateDeadline(request.applicationDate(), request.deadline());

        InternshipApplication application = InternshipApplication.builder()
                .userId(request.userId())
                .company(company)
                .jobTitle(request.jobTitle())
                .applicationUrl(request.applicationUrl())
                .applicationDate(request.applicationDate())
                .deadline(request.deadline())
                .status(request.status() != null ? request.status() : ApplicationStatus.SAVED)
                .notes(request.notes())
                .salaryOffered(request.salaryOffered())
                .location(request.location())
                .workMode(request.workMode())
                .build();

        return InternshipApplicationMapper.toResponse(applicationRepository.save(application));
    }

    @Override
    @Transactional(readOnly = true)
    public InternshipApplicationResponse getApplication(UUID id) {
        return applicationRepository.findById(id)
                .map(InternshipApplicationMapper::toResponse)
                .orElseThrow(() -> new ApplicationNotFoundException(id));
    }

    @Override
    @Transactional
    public InternshipApplicationResponse updateApplication(UUID id, UpdateInternshipApplicationRequest request) {
        InternshipApplication application = applicationRepository.findById(id)
                .orElseThrow(() -> new ApplicationNotFoundException(id));

        validateDeadline(request.applicationDate(), request.deadline());



        application.setJobTitle(request.jobTitle());
        application.setApplicationUrl(request.applicationUrl());
        application.setApplicationDate(request.applicationDate());
        application.setDeadline(request.deadline());
        application.setStatus(request.status());
        application.setNotes(request.notes());
        application.setSalaryOffered(request.salaryOffered());
        application.setLocation(request.location());
        application.setWorkMode(request.workMode());

        return InternshipApplicationMapper.toResponse(applicationRepository.save(application));
    }

    @Override
    @Transactional
    public void deleteApplication(UUID id) {
        if (!applicationRepository.existsById(id)) {
            throw new ApplicationNotFoundException(id);
        }
        applicationRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<InternshipApplicationResponse> getApplications(UUID userId, Pageable pageable) {
        return applicationRepository.findByUserId(userId, pageable)
                .map(InternshipApplicationMapper::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<InternshipApplicationResponse> searchApplications(
            UUID userId, ApplicationStatus status, UUID companyId, String companyName, Pageable pageable) {

        Specification<InternshipApplication> spec = Specification
                .where(InternshipApplicationSpecifications.belongsToUser(userId))
                .and(InternshipApplicationSpecifications.hasStatus(status))
                .and(InternshipApplicationSpecifications.hasCompanyId(companyId))
                .and(InternshipApplicationSpecifications.companyNameContains(companyName));

        return applicationRepository.findAll(spec, pageable).map(InternshipApplicationMapper::toResponse);
    }

    private void validateDeadline(java.time.LocalDate applicationDate, java.time.LocalDate deadline) {
        if (deadline != null && deadline.isBefore(applicationDate)) {
            throw new InvalidApplicationDateException(applicationDate, deadline);
        }
    }
}
