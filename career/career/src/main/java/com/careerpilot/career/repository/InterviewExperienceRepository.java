package com.careerpilot.career.repository;

import com.careerpilot.career.domain.InterviewExperience;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.UUID;

public interface InterviewExperienceRepository
        extends JpaRepository<InterviewExperience, UUID>, JpaSpecificationExecutor<InterviewExperience> {

    Page<InterviewExperience> findByUserId(UUID userId, Pageable pageable);
    long countByUserId(UUID userId);
}
