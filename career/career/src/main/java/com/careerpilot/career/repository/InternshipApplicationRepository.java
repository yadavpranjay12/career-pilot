package com.careerpilot.career.repository;

import com.careerpilot.career.domain.ApplicationStatus;
import com.careerpilot.career.domain.InternshipApplication;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.UUID;

public interface InternshipApplicationRepository
        extends JpaRepository<InternshipApplication, UUID>, JpaSpecificationExecutor<InternshipApplication> {

    Page<InternshipApplication> findByUserId(UUID userId, Pageable pageable);

    Page<InternshipApplication> findByUserIdAndStatus(UUID userId, ApplicationStatus status, Pageable pageable);

    Page<InternshipApplication> findByUserIdAndCompanyId(UUID userId, UUID companyId, Pageable pageable);

    boolean existsByUserIdAndCompanyIdAndJobTitleIgnoreCase(UUID userId, UUID companyId, String jobTitle);
}
