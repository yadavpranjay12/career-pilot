package com.careerpilot.career.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(
        name = "user_profiles",
        indexes = { @Index(name = "idx_user_profiles_user_id", columnList = "user_id", unique = true) }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfile extends BaseAuditEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    /**
     * Plain UUID reference to Auth Service's User.id — never a JPA relationship.
     * No @ManyToOne, no @JoinColumn, no cross-schema FK constraint. This service
     * knows only that some user with this id exists; Auth is the sole source of
     * truth for identity. Ownership is enforced by application logic (and, once
     * the JWT-validation phase lands, by the token's subject claim) — not by the
     * database.
     */
    @Column(name = "user_id", nullable = false, unique = true)
    private UUID userId;

    @Column(name = "headline", length = 200)
    private String headline;

    @Column(name = "bio", columnDefinition = "TEXT")
    private String bio;

    @Column(name = "location", length = 150)
    private String location;

    @Column(name = "target_role", length = 150)
    private String targetRole;

    @Column(name = "years_of_experience")
    private Integer yearsOfExperience;

    @Column(name = "phone_number", length = 20)
    private String phoneNumber;

    @Column(name = "linkedin_url", length = 255)
    private String linkedinUrl;

    @Column(name = "github_url", length = 255)
    private String githubUrl;

    @Column(name = "portfolio_url", length = 255)
    private String portfolioUrl;
}
