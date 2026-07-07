package com.careerpilot.career.service;

import com.careerpilot.career.domain.ApplicationStatus;
import com.careerpilot.career.dto.request.CreateInternshipApplicationRequest;
import com.careerpilot.career.dto.request.UpdateInternshipApplicationRequest;
import com.careerpilot.career.dto.response.InternshipApplicationResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface InternshipApplicationService {
    InternshipApplicationResponse createApplication(CreateInternshipApplicationRequest request);
    InternshipApplicationResponse getApplication(UUID id);
    InternshipApplicationResponse updateApplication(UUID id, UpdateInternshipApplicationRequest request);
    void deleteApplication(UUID id);
    Page<InternshipApplicationResponse> getApplications(UUID userId, Pageable pageable);
    Page<InternshipApplicationResponse> searchApplications(
            UUID userId, ApplicationStatus status, UUID companyId, String companyName, Pageable pageable
    );
}
