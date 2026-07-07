package com.careerpilot.career.repository;

import com.careerpilot.career.domain.Goal;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.UUID;

public interface GoalRepository extends JpaRepository<Goal, UUID>, JpaSpecificationExecutor<Goal> {
    Page<Goal> findByUserId(UUID userId, Pageable pageable);
}
