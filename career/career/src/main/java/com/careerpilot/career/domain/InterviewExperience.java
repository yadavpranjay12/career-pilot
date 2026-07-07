package com.careerpilot.career.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(
        name = "interview_experiences",
        indexes = {
                @Index(name = "idx_interview_user_id", columnList = "user_id"),
                @Index(name = "idx_interview_company_id", columnList = "company_id"),
                @Index(name = "idx_interview_round", columnList = "interview_round"),
                @Index(name = "idx_interview_result", columnList = "result")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InterviewExperience extends BaseAuditEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Column(name = "role", nullable = false, length = 200)
    private String role;

    @Enumerated(EnumType.STRING)
    @Column(name = "interview_round", nullable = false, length = 20)
    private InterviewRoundType interviewRound;

    @Enumerated(EnumType.STRING)
    @Column(name = "result", nullable = false, length = 20)
    @Builder.Default
    private InterviewResult result = InterviewResult.PENDING;

    @Column(name = "interview_date", nullable = false)
    private LocalDate interviewDate;

    @Column(name = "experience", columnDefinition = "TEXT")
    private String experience;

    @Column(name = "tips", columnDefinition = "TEXT")
    private String tips;

    @Column(name = "difficulty_rating")
    private Integer difficultyRating;
}
