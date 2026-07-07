CREATE TABLE problems (
    id                  UUID PRIMARY KEY,
    user_id             UUID NOT NULL,
    title               VARCHAR(300) NOT NULL,
    platform            VARCHAR(100),
    topic               VARCHAR(100),
    difficulty          VARCHAR(20) NOT NULL,
    status              VARCHAR(20) NOT NULL DEFAULT 'NOT_STARTED',
    notes               TEXT,
    solution_url        VARCHAR(255),
    solved_date         DATE,
    revision_count      INTEGER NOT NULL DEFAULT 0,
    next_revision_date  DATE,
    created_at          TIMESTAMP NOT NULL DEFAULT now(),
    updated_at          TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT chk_problems_revision_count_non_negative CHECK (revision_count >= 0)
);

CREATE TABLE goals (
    id               UUID PRIMARY KEY,
    user_id          UUID NOT NULL,
    title            VARCHAR(200) NOT NULL,
    description      TEXT,
    target_count     INTEGER NOT NULL,
    completed_count  INTEGER NOT NULL DEFAULT 0,
    target_date      DATE,
    status           VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    type             VARCHAR(20) NOT NULL,
    created_at       TIMESTAMP NOT NULL DEFAULT now(),
    updated_at       TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT chk_goals_target_count_positive CHECK (target_count > 0),
    CONSTRAINT chk_goals_completed_le_target CHECK (completed_count <= target_count),
    CONSTRAINT chk_goals_completed_non_negative CHECK (completed_count >= 0)
);

CREATE INDEX idx_problems_user_id     ON problems(user_id);
CREATE INDEX idx_problems_status      ON problems(status);
CREATE INDEX idx_problems_topic       ON problems(topic);
CREATE INDEX idx_problems_difficulty  ON problems(difficulty);
CREATE INDEX idx_problems_user_status ON problems(user_id, status);

CREATE INDEX idx_goals_user_id     ON goals(user_id);
CREATE INDEX idx_goals_status      ON goals(status);
CREATE INDEX idx_goals_type        ON goals(type);
CREATE INDEX idx_goals_user_status ON goals(user_id, status);
