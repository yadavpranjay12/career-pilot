package com.careerpilot.career.controller;

import com.careerpilot.career.domain.ProblemDifficulty;
import com.careerpilot.career.domain.ProblemStatus;
import com.careerpilot.career.domain.ProblemTopic;
import com.careerpilot.career.dto.request.*;
import com.careerpilot.career.dto.response.ProblemResponse;
import com.careerpilot.career.service.ProblemService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/problems")
@RequiredArgsConstructor
public class ProblemController {

    private final ProblemService problemService;

    @PostMapping
    public ResponseEntity<ProblemResponse> create(@Valid @RequestBody CreateProblemRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(problemService.createProblem(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProblemResponse> get(@PathVariable UUID id) {
        return ResponseEntity.ok(problemService.getProblem(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProblemResponse> update(
            @PathVariable UUID id, @Valid @RequestBody UpdateProblemRequest request
    ) {
        return ResponseEntity.ok(problemService.updateProblem(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        problemService.deleteProblem(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<Page<ProblemResponse>> list(@RequestParam UUID userId, Pageable pageable) {
        return ResponseEntity.ok(problemService.getProblems(userId, pageable));
    }

    @GetMapping("/search")
    public ResponseEntity<Page<ProblemResponse>> search(
            @RequestParam UUID userId,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false)
            ProblemTopic topic,
            @RequestParam(required = false) ProblemDifficulty difficulty,
            @RequestParam(required = false) ProblemStatus status,
            Pageable pageable
    ) {
        return ResponseEntity.ok(problemService.searchProblems(userId, keyword, topic, difficulty, status, pageable));
    }

    @PostMapping("/{id}/complete")
    public ResponseEntity<ProblemResponse> complete(
            @PathVariable UUID id, @Valid @RequestBody CompleteProblemRequest request
    ) {
        return ResponseEntity.ok(problemService.markCompleted(id, request));
    }

    @PostMapping("/{id}/revisions")
    public ResponseEntity<ProblemResponse> incrementRevision(@PathVariable UUID id) {
        return ResponseEntity.ok(problemService.incrementRevision(id));
    }

    @PutMapping("/{id}/next-revision")
    public ResponseEntity<ProblemResponse> scheduleNextRevision(
            @PathVariable UUID id, @Valid @RequestBody ScheduleRevisionRequest request
    ) {
        return ResponseEntity.ok(problemService.scheduleNextRevision(id, request));
    }
}
