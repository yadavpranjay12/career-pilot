package com.careerpilot.career.controller;

import com.careerpilot.career.domain.CompanySize;
import com.careerpilot.career.dto.request.CreateCompanyRequest;
import com.careerpilot.career.dto.request.UpdateCompanyRequest;
import com.careerpilot.career.dto.response.CompanyResponse;
import com.careerpilot.career.service.CompanyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.UUID;

@RestController
@RequestMapping("/api/companies")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;

    private String getUserId(Principal principal) {
        if (principal == null) {
            // Log this clearly so you can see it in your terminal

            throw new org.springframework.security.authentication.AuthenticationCredentialsNotFoundException("User not authenticated");
        }
        return principal.getName();
    }

    @PostMapping
    public ResponseEntity<CompanyResponse> create(
            Principal principal,
            @Valid @RequestBody CreateCompanyRequest request) {
        String userId = getUserId(principal);System.out.println("Principal is: " + (principal != null ? principal.getName() : "NULL"));
        return ResponseEntity.status(HttpStatus.CREATED).body(companyService.createCompany(userId, request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CompanyResponse> get(
            Principal principal,
            @PathVariable UUID id) {
        String userId = getUserId(principal);
        return ResponseEntity.ok(companyService.getCompany(id, userId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CompanyResponse> update(
            Principal principal,
            @PathVariable UUID id,
            @Valid @RequestBody UpdateCompanyRequest request
    ) {
        String userId = getUserId(principal);
        return ResponseEntity.ok(companyService.updateCompany(id, userId, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            Principal principal,
            @PathVariable UUID id) {
        String userId = getUserId(principal);
        companyService.deleteCompany(id, userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<Page<CompanyResponse>> list(
            Principal principal,
            Pageable pageable) {
        String userId = getUserId(principal);
        return ResponseEntity.ok(companyService.listCompanies(userId, pageable));
    }

    @GetMapping("/search")
    public ResponseEntity<Page<CompanyResponse>> search(
            Principal principal,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String industry,
            @RequestParam(required = false) CompanySize size,
            @RequestParam(required = false) Boolean isHiring,
            Pageable pageable
    ) {
        String userId = getUserId(principal);
        return ResponseEntity.ok(
                companyService.searchCompanies(
                        userId,
                        keyword,
                        industry,
                        size,
                        isHiring,
                        pageable
                )
        );
    }
}