package com.careerpilot.career.service.impl;

import com.careerpilot.career.domain.Problem;
import com.careerpilot.career.domain.ProblemDifficulty;
import com.careerpilot.career.domain.ProblemStatus;
import com.careerpilot.career.domain.ProblemTopic;
import com.careerpilot.career.dto.request.*;
import com.careerpilot.career.dto.response.ProblemResponse;
import com.careerpilot.career.exception.InvalidRevisionException;
import com.careerpilot.career.exception.ProblemNotFoundException;
import com.careerpilot.career.mapper.ProblemMapper;
import com.careerpilot.career.repository.ProblemRepository;
import com.careerpilot.career.repository.spec.ProblemSpecifications;
import com.careerpilot.career.service.ProblemService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProblemServiceImpl implements ProblemService {

    private final ProblemRepository problemRepository;

    @Override
    @Transactional
    public ProblemResponse createProblem(CreateProblemRequest request) {
        ProblemStatus status = request.status() != null ? request.status() : ProblemStatus.NOT_STARTED;
        validateSolvedDateConsistency(status, request.solvedDate());
        validateRevisionOrdering(request.solvedDate(), request.nextRevisionDate());

        Problem problem = Problem.builder()
                .userId(request.userId())
                .title(request.title())
                .platform(request.platform())
                .topic(request.topic())
                .difficulty(request.difficulty())
                .status(status)
                .notes(request.notes())
                .solutionUrl(request.solutionUrl())
                .solvedDate(request.solvedDate())
                .revisionCount(0)
                .nextRevisionDate(request.nextRevisionDate())
                .build();

        return ProblemMapper.toResponse(problemRepository.save(problem));
    }

    @Override
    @Transactional(readOnly = true)
    public ProblemResponse getProblem(UUID id) {
        return problemRepository.findById(id)
                .map(ProblemMapper::toResponse)
                .orElseThrow(() -> new ProblemNotFoundException(id));
    }

    @Override
    @Transactional
    public ProblemResponse updateProblem(UUID id, UpdateProblemRequest request) {
        Problem problem = problemRepository.findById(id)
                .orElseThrow(() -> new ProblemNotFoundException(id));

        validateSolvedDateConsistency(request.status(), request.solvedDate());
        validateRevisionOrdering(request.solvedDate(), request.nextRevisionDate());

        problem.setTitle(request.title());
        problem.setPlatform(request.platform());
        problem.setTopic(request.topic());
        problem.setDifficulty(request.difficulty());
        problem.setStatus(request.status());
        problem.setNotes(request.notes());
        problem.setSolutionUrl(request.solutionUrl());
        problem.setSolvedDate(request.solvedDate());
        problem.setNextRevisionDate(request.nextRevisionDate());

        return ProblemMapper.toResponse(problemRepository.save(problem));
    }

    @Override
    @Transactional
    public void deleteProblem(UUID id) {
        if (!problemRepository.existsById(id)) {
            throw new ProblemNotFoundException(id);
        }
        problemRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ProblemResponse> getProblems(UUID userId, Pageable pageable) {
        return problemRepository.findByUserId(userId, pageable).map(ProblemMapper::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ProblemResponse> searchProblems(
            UUID userId,
            String keyword,
            ProblemTopic topic,
            ProblemDifficulty difficulty,
            ProblemStatus status,
            Pageable pageable){

        Specification<Problem> spec = Specification
                .where(ProblemSpecifications.belongsToUser(userId))
                .and(ProblemSpecifications.titleContains(keyword))
                .and(ProblemSpecifications.hasTopic(topic))
                .and(ProblemSpecifications.hasDifficulty(difficulty))
                .and(ProblemSpecifications.hasStatus(status));

        return problemRepository.findAll(spec, pageable).map(ProblemMapper::toResponse);
    }

    @Override
    @Transactional
    public ProblemResponse markCompleted(UUID id, CompleteProblemRequest request) {
        Problem problem = problemRepository.findById(id)
                .orElseThrow(() -> new ProblemNotFoundException(id));

        LocalDate solvedDate = request.solvedDate() != null
                ? request.solvedDate()
                : LocalDate.now();

        problem.setStatus(ProblemStatus.COMPLETED);
        problem.setSolvedDate(solvedDate);

        if (problem.getNextRevisionDate() != null &&
                problem.getNextRevisionDate().isBefore(solvedDate)) {

            problem.setNextRevisionDate(null);
        }

        return ProblemMapper.toResponse(problemRepository.save(problem));}

    @Override
    @Transactional
    public ProblemResponse incrementRevision(UUID id) {
        Problem problem = problemRepository.findById(id)
                .orElseThrow(() -> new ProblemNotFoundException(id));

        problem.setRevisionCount(problem.getRevisionCount() + 1);

        return ProblemMapper.toResponse(problemRepository.save(problem));
    }

    @Override
    @Transactional
    public ProblemResponse scheduleNextRevision(UUID id, ScheduleRevisionRequest request) {
        Problem problem = problemRepository.findById(id)
                .orElseThrow(() -> new ProblemNotFoundException(id));

        validateRevisionOrdering(problem.getSolvedDate(), request.nextRevisionDate());
        problem.setNextRevisionDate(request.nextRevisionDate());

        return ProblemMapper.toResponse(problemRepository.save(problem));
    }

    private void validateSolvedDateConsistency(ProblemStatus status, LocalDate solvedDate) {
        if (status == ProblemStatus.COMPLETED && solvedDate == null) {
            throw new InvalidRevisionException("solvedDate is required when status is COMPLETED");
        }
        if (status != ProblemStatus.COMPLETED && solvedDate != null) {
            throw new InvalidRevisionException("solvedDate must be empty unless status is COMPLETED");
        }
    }

    private void validateRevisionOrdering(LocalDate solvedDate, LocalDate nextRevisionDate) {
        if (solvedDate != null && nextRevisionDate != null && nextRevisionDate.isBefore(solvedDate)) {
            throw new InvalidRevisionException("nextRevisionDate cannot be before solvedDate");
        }
    }
}
