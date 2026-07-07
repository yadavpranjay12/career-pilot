package com.careerpilot.career.controller;

import com.careerpilot.career.domain.GoalStatus;
import com.careerpilot.career.domain.GoalType;
import com.careerpilot.career.dto.request.CreateGoalRequest;
import com.careerpilot.career.dto.request.UpdateGoalProgressRequest;
import com.careerpilot.career.dto.request.UpdateGoalRequest;
import com.careerpilot.career.dto.response.GoalResponse;
import com.careerpilot.career.service.GoalService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/goals")
@RequiredArgsConstructor
public class GoalController {

    private final GoalService goalService;

    @PostMapping
    public ResponseEntity<GoalResponse> create(@Valid @RequestBody CreateGoalRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(goalService.createGoal(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<GoalResponse> get(@PathVariable UUID id) {
        return ResponseEntity.ok(goalService.getGoal(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<GoalResponse> update(
            @PathVariable UUID id, @Valid @RequestBody UpdateGoalRequest request
    ) {
        return ResponseEntity.ok(goalService.updateGoal(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        goalService.deleteGoal(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<Page<GoalResponse>> list(@RequestParam UUID userId, Pageable pageable) {
        return ResponseEntity.ok(goalService.getGoals(userId, pageable));
    }

    @GetMapping("/search")
    public ResponseEntity<Page<GoalResponse>> filter(
            @RequestParam UUID userId,
            @RequestParam(required = false) GoalStatus status,
            @RequestParam(required = false) GoalType type,
            Pageable pageable
    ) {
        return ResponseEntity.ok(goalService.filterGoals(userId, status, type, pageable));
    }

    @PatchMapping("/{id}/progress")
    public ResponseEntity<GoalResponse> updateProgress(
            @PathVariable UUID id, @Valid @RequestBody UpdateGoalProgressRequest request
    ) {
        return ResponseEntity.ok(goalService.updateProgress(id, request));
    }

    @PostMapping("/{id}/cancel")
    public ResponseEntity<GoalResponse> cancel(@PathVariable UUID id) {
        return ResponseEntity.ok(goalService.cancelGoal(id));
    }
}
