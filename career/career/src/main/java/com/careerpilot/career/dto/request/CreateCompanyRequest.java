package com.careerpilot.career.dto.request;

import com.careerpilot.career.domain.CompanySize;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CreateCompanyRequest(
        @NotBlank @Size(max = 200) String name,
        @Size(max = 100) String industry,
        @Pattern(regexp = "^(https?://).*") String website,
        @Size(max = 5000) String description,
        CompanySize size,
        @Size(max = 150) String location,
        @Pattern(regexp = "^(https?://).*", message = "Career page URL must start with http:// or https://")
        String careerPageUrl,
        @Pattern(regexp = "^(https?://).*", message = "Application URL must start with http:// or https://")
        String applicationUrl,
        boolean isHiring)
{}
