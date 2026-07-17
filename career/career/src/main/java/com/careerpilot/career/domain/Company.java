package com.careerpilot.career.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(
        name = "companies",
        indexes = {
                @Index(name = "idx_companies_name", columnList = "name"),
                @Index(name = "idx_companies_industry", columnList = "industry"),
                @Index(name = "idx_companies_user_id", columnList = "user_id") // Added index for faster user queries
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Company extends BaseAuditEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    // Added userId to link the company to the specific user
    @Column(name = "user_id", nullable = false)
    private String userId;

    // Removed unique=true so different users can have companies with the same name
    @Column(name = "name", nullable = false, length = 200)
    private String name;

    @Column(name = "industry", length = 100)
    private String industry;

    @Column(name = "website", length = 255)
    private String website;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "size", length = 20)
    private CompanySize size;

    @Column(name = "career_page_url", length = 255)
    private String careerPageUrl;

    @Column(name = "application_url", length = 255)
    private String applicationUrl;

    @Column(name = "is_hiring", nullable = false)
    @Builder.Default
    @JsonProperty("isHiring")
    private boolean isHiring = false;

    @Column(name = "location", length = 150)
    private String location;
    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<InternshipApplication> applications = new ArrayList<>();
}