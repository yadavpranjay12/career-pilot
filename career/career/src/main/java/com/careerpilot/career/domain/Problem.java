package com.careerpilot.career.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(
        name = "problems",
        indexes = {
                @Index(name = "idx_problems_user_id", columnList = "user_id"),
                @Index(name = "idx_problems_status", columnList = "status"),
                @Index(name = "idx_problems_topic", columnList = "topic"),
                @Index(name = "idx_problems_difficulty", columnList = "difficulty"),
                @Index(name = "idx_problems_user_status", columnList = "user_id, status")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Problem extends BaseAuditEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "title", nullable = false, length = 300)
    private String title;

    @Column(name = "platform", length = 100)
    private String platform;

    @Column(name = "topic", length = 100)
    private String topic;

    @Enumerated(EnumType.STRING)
    @Column(name = "difficulty", nullable = false, length = 20)
    private ProblemDifficulty difficulty;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    @Builder.Default
    private ProblemStatus status = ProblemStatus.NOT_STARTED;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    @Column(name = "solution_url", length = 255)
    private String solutionUrl;

    @Column(name = "solved_date")
    private LocalDate solvedDate;

    @Column(name = "revision_count", nullable = false)
    @Builder.Default
    private Integer revisionCount = 0;

    @Column(name = "next_revision_date")
    private LocalDate nextRevisionDate;
}
