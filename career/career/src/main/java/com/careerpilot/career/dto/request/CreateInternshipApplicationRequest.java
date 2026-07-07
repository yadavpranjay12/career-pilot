package com.careerpilot.career.dto.request;

import com.careerpilot.career.domain.ApplicationStatus;
import com.careerpilot.career.domain.WorkMode;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

public record CreateInternshipApplicationRequest(

        @NotNull(message = "userId is required")
        UUID userId,

        @NotNull(message = "companyId is required")
        UUID companyId,

        @NotBlank(message = "Job title is required")
        @Size(max = 200, message = "Job title must not exceed 200 characters")
        String jobTitle,

        @Pattern(regexp = "^(https?://).*", message = "Application URL must start with http:// or https://")
        String applicationUrl,

        @NotNull(message = "Application date is required")
        LocalDate applicationDate,

        LocalDate deadline,

        ApplicationStatus status,

        @Size(max = 4000, message = "Notes must not exceed 4000 characters")
        String notes,

        @DecimalMin(value = "0.0", inclusive = true, message = "Salary offered cannot be negative")
        BigDecimal salaryOffered,

        @Size(max = 150) String location,

        WorkMode workMode
) {}
