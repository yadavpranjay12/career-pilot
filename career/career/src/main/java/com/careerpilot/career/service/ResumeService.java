package com.careerpilot.career.service;

import com.careerpilot.career.dto.request.CreateResumeRequest;
import com.careerpilot.career.dto.request.UpdateResumeRequest;
import com.careerpilot.career.dto.response.ResumeResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface ResumeService {
    ResumeResponse createResume(CreateResumeRequest request);
    ResumeResponse getResume(UUID id);
    ResumeResponse updateResume(UUID id, UpdateResumeRequest request);
    void deleteResume(UUID id);
    Page<ResumeResponse> getResumes(UUID userId, Pageable pageable);
    ResumeResponse setDefaultResume(UUID id);
    ResumeResponse archiveResume(UUID id);
}
