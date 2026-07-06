package com.careerpilot.career.dto.request;

import com.careerpilot.career.domain.CompanySize;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UpdateCompanyRequest(
        @NotBlank @Size(max = 200) String name,
        @Size(max = 100) String industry,
        @Pattern(regexp = "^(https?://).*") String website,
        @Size(max = 5000) String description,
        CompanySize size,
        @Size(max = 150) String location,
        @Pattern(regexp = "^(https?://).*") String careerPageUrl,
        @Pattern(regexp = "^(https?://).*") String applicationUrl,
        boolean isHiring
) {}
