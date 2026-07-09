package com.careerpilot.career.repository;

import com.careerpilot.career.domain.Resume;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface ResumeRepository extends JpaRepository<Resume, UUID> {
    Page<Resume> findByUserId(UUID userId, Pageable pageable);
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("""
UPDATE Resume r
SET r.isDefault = false
WHERE r.userId = :userId
""")
    int clearDefaultByUserId(@Param("userId") UUID userId);
    Optional<Resume> findByUserIdAndIsDefaultTrue(UUID userId);
}
