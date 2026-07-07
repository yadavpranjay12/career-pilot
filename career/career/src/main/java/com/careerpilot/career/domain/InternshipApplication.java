package com.careerpilot.career.domain;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(
        name = "internship_applications",
        indexes = {
                @Index(name = "idx_applications_user_id", columnList = "user_id"),
                @Index(name = "idx_applications_status", columnList = "status"),
                @Index(name = "idx_applications_company_id", columnList = "company_id"),
                @Index(name = "idx_applications_user_status", columnList = "user_id, status")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InternshipApplication extends BaseAuditEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    /** Plain UUID reference to Auth's User — same boundary rule as UserProfile.userId. */
    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Column(name = "job_title", nullable = false, length = 200)
    private String jobTitle;

    @Column(name = "application_url", length = 255)
    private String applicationUrl;

    @Column(name = "application_date", nullable = false)
    private LocalDate applicationDate;

    @Column(name = "deadline")
    private LocalDate deadline;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    @Builder.Default
    private ApplicationStatus status = ApplicationStatus.SAVED;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    @Column(name = "salary_offered", precision = 12, scale = 2)
    private BigDecimal salaryOffered;

    @Column(name = "location", length = 150)
    private String location;

    @Enumerated(EnumType.STRING)
    @Column(name = "work_mode", length = 20)
    private WorkMode workMode;
}
