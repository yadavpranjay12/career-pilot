package com.careerpilot.career.controller;

import com.careerpilot.career.domain.InterviewResult;
import com.careerpilot.career.domain.InterviewRoundType;
import com.careerpilot.career.dto.request.CreateInterviewExperienceRequest;
import com.careerpilot.career.dto.request.UpdateInterviewExperienceRequest;
import com.careerpilot.career.dto.response.InterviewExperienceResponse;
import com.careerpilot.career.service.InterviewExperienceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/interview-experiences")
@RequiredArgsConstructor
public class InterviewExperienceController {

    private final InterviewExperienceService experienceService;

    @PostMapping
    public ResponseEntity<InterviewExperienceResponse> create(
            @Valid @RequestBody CreateInterviewExperienceRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(experienceService.createExperience(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<InterviewExperienceResponse> get(@PathVariable UUID id) {
        return ResponseEntity.ok(experienceService.getExperience(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<InterviewExperienceResponse> update(
            @PathVariable UUID id, @Valid @RequestBody UpdateInterviewExperienceRequest request
    ) {
        return ResponseEntity.ok(experienceService.updateExperience(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        experienceService.deleteExperience(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<Page<InterviewExperienceResponse>> list(
            @RequestParam UUID userId, Pageable pageable
    ) {
        return ResponseEntity.ok(experienceService.getExperiences(userId, pageable));
    }

    @GetMapping("/search")
    public ResponseEntity<Page<InterviewExperienceResponse>> search(
            @RequestParam UUID userId,
            @RequestParam(required = false) String companyName,
            @RequestParam(required = false) InterviewRoundType round,
            @RequestParam(required = false) InterviewResult result,
            Pageable pageable
    ) {
        return ResponseEntity.ok(experienceService.searchExperiences(userId, companyName, round, result, pageable));
    }
}
