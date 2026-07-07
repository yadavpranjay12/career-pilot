package com.careerpilot.career.controller;

import com.careerpilot.career.dto.request.CreateResumeRequest;
import com.careerpilot.career.dto.request.UpdateResumeRequest;
import com.careerpilot.career.dto.response.ResumeResponse;
import com.careerpilot.career.service.ResumeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/resumes")
@RequiredArgsConstructor
public class ResumeController {

    private final ResumeService resumeService;

    @PostMapping
    public ResponseEntity<ResumeResponse> create(@Valid @RequestBody CreateResumeRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(resumeService.createResume(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResumeResponse> get(@PathVariable UUID id) {
        return ResponseEntity.ok(resumeService.getResume(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResumeResponse> update(
            @PathVariable UUID id, @Valid @RequestBody UpdateResumeRequest request
    ) {
        return ResponseEntity.ok(resumeService.updateResume(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        resumeService.deleteResume(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<Page<ResumeResponse>> list(@RequestParam UUID userId, Pageable pageable) {
        return ResponseEntity.ok(resumeService.getResumes(userId, pageable));
    }

    @PostMapping("/{id}/set-default")
    public ResponseEntity<ResumeResponse> setDefault(@PathVariable UUID id) {
        return ResponseEntity.ok(resumeService.setDefaultResume(id));
    }

    @PostMapping("/{id}/archive")
    public ResponseEntity<ResumeResponse> archive(@PathVariable UUID id) {
        return ResponseEntity.ok(resumeService.archiveResume(id));
    }
}
