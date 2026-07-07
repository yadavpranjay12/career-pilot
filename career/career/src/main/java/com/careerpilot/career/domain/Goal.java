package com.careerpilot.career.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(
        name = "goals",
        indexes = {
                @Index(name = "idx_goals_user_id", columnList = "user_id"),
                @Index(name = "idx_goals_status", columnList = "status"),
                @Index(name = "idx_goals_type", columnList = "type"),
                @Index(name = "idx_goals_user_status", columnList = "user_id, status")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Goal extends BaseAuditEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "title", nullable = false, length = 200)
    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "target_count", nullable = false)
    private Integer targetCount;

    @Column(name = "completed_count", nullable = false)
    @Builder.Default
    private Integer completedCount = 0;

    @Column(name = "target_date")
    private LocalDate targetDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    @Builder.Default
    private GoalStatus status = GoalStatus.ACTIVE;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false, length = 20)
    private GoalType type;
}
