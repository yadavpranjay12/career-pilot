CREATE TABLE internship_applications (
    id                 UUID PRIMARY KEY,
    user_id            UUID NOT NULL,
    company_id         UUID NOT NULL REFERENCES companies(id),
    job_title          VARCHAR(200) NOT NULL,
    application_url    VARCHAR(255),
    application_date   DATE NOT NULL,
    deadline           DATE,
    status             VARCHAR(20) NOT NULL DEFAULT 'SAVED',
    notes              TEXT,
    salary_offered     NUMERIC(12,2),
    location           VARCHAR(150),
    work_mode          VARCHAR(20),
    created_at         TIMESTAMP NOT NULL DEFAULT now(),
    updated_at         TIMESTAMP NOT NULL DEFAULT now()
);

CREATE INDEX idx_applications_user_id     ON internship_applications(user_id);
CREATE INDEX idx_applications_status      ON internship_applications(status);
CREATE INDEX idx_applications_company_id  ON internship_applications(company_id);
CREATE INDEX idx_applications_user_status ON internship_applications(user_id, status);

-- Defense-in-depth: same duplicate rule the service enforces, backstopped at the DB
-- so a race between two concurrent requests for the same user/company/title can't
-- slip two rows past the service-layer check.
CREATE UNIQUE INDEX uq_applications_user_company_title
    ON internship_applications (user_id, company_id, LOWER(job_title));
