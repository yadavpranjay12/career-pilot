package com.careerpilot.career.mapper;

import com.careerpilot.career.domain.Resume;
import com.careerpilot.career.dto.response.ResumeResponse;

public final class ResumeMapper {

    private ResumeMapper() {}

    public static ResumeResponse toResponse(Resume resume) {
        return new ResumeResponse(
                resume.getId(), resume.getUserId(), resume.getTitle(), resume.getFileName(),
                resume.getFileUrl(), resume.getVersion(), resume.getStatus(), resume.isDefault(),
                resume.getCreatedAt(), resume.getUpdatedAt()
        );
    }
}
