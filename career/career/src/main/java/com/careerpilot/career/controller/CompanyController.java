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

import java.util.UUID;

@RestController
@RequestMapping("/api/companies")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;

    @PostMapping
    public ResponseEntity<CompanyResponse> create(@Valid @RequestBody CreateCompanyRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(companyService.createCompany(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CompanyResponse> get(@PathVariable UUID id) {
        return ResponseEntity.ok(companyService.getCompany(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CompanyResponse> update(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateCompanyRequest request
    ) {
        return ResponseEntity.ok(companyService.updateCompany(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        companyService.deleteCompany(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<Page<CompanyResponse>> list(Pageable pageable) {
        return ResponseEntity.ok(companyService.listCompanies(pageable));
    }

    @GetMapping("/search")
    public ResponseEntity<Page<CompanyResponse>> search(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String industry,
            @RequestParam(required = false) CompanySize size,@RequestParam(required = false) Boolean isHiring,
            Pageable pageable
    ) {
        return ResponseEntity.ok(
                companyService.searchCompanies(
                        keyword,
                        industry,
                        size,
                        isHiring,
                        pageable
                )
        );}
}
