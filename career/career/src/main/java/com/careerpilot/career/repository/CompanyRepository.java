package com.careerpilot.career.repository;

import com.careerpilot.career.domain.Company;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CompanyRepository extends JpaRepository<Company, UUID>, JpaSpecificationExecutor<Company> {
    boolean existsByNameIgnoreCaseAndUserId(String name, String userId);
    Optional<Company> findByIdAndUserId(UUID id, String userId);
    boolean existsByIdAndUserId(UUID id, String userId);
    Page<Company> findAllByUserId(String userId, Pageable pageable);
}
