CREATE TABLE resumes (
    id          UUID PRIMARY KEY,
    user_id     UUID NOT NULL,
    title       VARCHAR(200) NOT NULL,
    file_name   VARCHAR(255) NOT NULL,
    file_url    VARCHAR(255) NOT NULL,
    version     INTEGER NOT NULL DEFAULT 1,
    status      VARCHAR(20) NOT NULL DEFAULT 'DRAFT',
    is_default  BOOLEAN NOT NULL DEFAULT FALSE,
    created_at  TIMESTAMP NOT NULL DEFAULT now(),
    updated_at  TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT chk_resumes_version_positive CHECK (version > 0)
);

CREATE INDEX idx_resumes_user_id ON resumes(user_id);
CREATE INDEX idx_resumes_status  ON resumes(status);

-- Enforces "only one default resume per user" at the database level.
-- A partial index only covers rows where is_default = true, so any number
-- of non-default resumes coexist freely; only a second TRUE for the same
-- user_id collides.
CREATE UNIQUE INDEX uq_resumes_one_default_per_user
    ON resumes (user_id) WHERE is_default = true;

CREATE TABLE interview_experiences (
    id                 UUID PRIMARY KEY,
    user_id            UUID NOT NULL,
    company_id         UUID NOT NULL REFERENCES companies(id),
    role               VARCHAR(200) NOT NULL,
    interview_round    VARCHAR(20) NOT NULL,
    result             VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    interview_date     DATE NOT NULL,
    experience         TEXT,
    tips               TEXT,
    difficulty_rating  INTEGER,
    created_at         TIMESTAMP NOT NULL DEFAULT now(),
    updated_at         TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT chk_interview_difficulty_range CHECK (difficulty_rating BETWEEN 1 AND 5)
);

CREATE INDEX idx_interview_user_id    ON interview_experiences(user_id);
CREATE INDEX idx_interview_company_id ON interview_experiences(company_id);
CREATE INDEX idx_interview_round      ON interview_experiences(interview_round);
CREATE INDEX idx_interview_result     ON interview_experiences(result);
