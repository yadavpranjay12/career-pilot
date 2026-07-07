package com.careerpilot.career.service;

import com.careerpilot.career.domain.ProblemDifficulty;
import com.careerpilot.career.domain.ProblemStatus;
import com.careerpilot.career.dto.request.*;
import com.careerpilot.career.dto.response.ProblemResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface ProblemService {
    ProblemResponse createProblem(CreateProblemRequest request);
    ProblemResponse getProblem(UUID id);
    ProblemResponse updateProblem(UUID id, UpdateProblemRequest request);
    void deleteProblem(UUID id);
    Page<ProblemResponse> getProblems(UUID userId, Pageable pageable);
    Page<ProblemResponse> searchProblems(
            UUID userId, String keyword, String topic, ProblemDifficulty difficulty, ProblemStatus status, Pageable pageable
    );
    ProblemResponse markCompleted(UUID id, CompleteProblemRequest request);
    ProblemResponse incrementRevision(UUID id);
    ProblemResponse scheduleNextRevision(UUID id, ScheduleRevisionRequest request);
}
