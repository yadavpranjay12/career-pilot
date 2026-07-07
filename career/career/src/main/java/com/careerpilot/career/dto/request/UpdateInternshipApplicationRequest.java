package com.careerpilot.career.dto.request;

import com.careerpilot.career.domain.ApplicationStatus;
import com.careerpilot.career.domain.WorkMode;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDate;

public record UpdateInternshipApplicationRequest(

        @NotBlank(message = "Job title is required")
        @Size(max = 200) String jobTitle,

        @Pattern(regexp = "^(https?://).*") String applicationUrl,

        @NotNull(message = "Application date is required")
        LocalDate applicationDate,

        LocalDate deadline,

        @NotNull(message = "Status is required")
        ApplicationStatus status,

        @Size(max = 4000) String notes,

        @DecimalMin(value = "0.0", inclusive = true) BigDecimal salaryOffered,

        @Size(max = 150) String location,

        WorkMode workMode
) {}
