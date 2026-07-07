package com.careerpilot.career.controller;

import com.careerpilot.career.domain.ApplicationStatus;
import com.careerpilot.career.dto.request.CreateInternshipApplicationRequest;
import com.careerpilot.career.dto.request.UpdateInternshipApplicationRequest;
import com.careerpilot.career.dto.response.InternshipApplicationResponse;
import com.careerpilot.career.service.InternshipApplicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class InternshipApplicationController {

    private final InternshipApplicationService applicationService;

    @PostMapping
    public ResponseEntity<InternshipApplicationResponse> create(
            @Valid @RequestBody CreateInternshipApplicationRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(applicationService.createApplication(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<InternshipApplicationResponse> get(@PathVariable UUID id) {
        return ResponseEntity.ok(applicationService.getApplication(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<InternshipApplicationResponse> update(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateInternshipApplicationRequest request
    ) {
        return ResponseEntity.ok(applicationService.updateApplication(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        applicationService.deleteApplication(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<Page<InternshipApplicationResponse>> list(
            @RequestParam UUID userId,
            Pageable pageable
    ) {
        return ResponseEntity.ok(applicationService.getApplications(userId, pageable));
    }

    @GetMapping("/search")
    public ResponseEntity<Page<InternshipApplicationResponse>> search(
            @RequestParam UUID userId,
            @RequestParam(required = false) ApplicationStatus status,
            @RequestParam(required = false) UUID companyId,
            @RequestParam(required = false) String companyName,
            Pageable pageable
    ) {
        return ResponseEntity.ok(
                applicationService.searchApplications(userId, status, companyId, companyName, pageable)
        );
    }
}
