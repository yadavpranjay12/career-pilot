package com.careerpilot.career.mapper;

import com.careerpilot.career.domain.InternshipApplication;
import com.careerpilot.career.dto.response.InternshipApplicationResponse;

public final class InternshipApplicationMapper {

    private InternshipApplicationMapper() {}

    public static InternshipApplicationResponse toResponse(InternshipApplication application) {
        return new InternshipApplicationResponse(
                application.getId(),
                application.getUserId(),
                application.getCompany().getId(),
                application.getCompany().getName(),
                application.getJobTitle(),
                application.getApplicationUrl(),
                application.getApplicationDate(),
                application.getDeadline(),
                application.getStatus(),
                application.getNotes(),
                application.getSalaryOffered(),
                application.getLocation(),
                application.getWorkMode(),
                application.getCreatedAt(),
                application.getUpdatedAt()
        );
    }
}
