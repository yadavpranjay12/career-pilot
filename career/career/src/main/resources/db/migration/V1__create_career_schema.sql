CREATE TABLE companies (
    id           UUID PRIMARY KEY,
    name         VARCHAR(200) NOT NULL,
    industry     VARCHAR(100),
    website      VARCHAR(255),
    description  TEXT,
    size         VARCHAR(20),
    location     VARCHAR(150),
    created_at   TIMESTAMP NOT NULL DEFAULT now(),
    updated_at   TIMESTAMP NOT NULL DEFAULT now(),
    career_page_url  VARCHAR(255),
       application_url  VARCHAR(255),
       is_hiring        BOOLEAN NOT NULL DEFAULT FALSE;
    CONSTRAINT uq_companies_name UNIQUE (name)
);

CREATE TABLE user_profiles (
    id                   UUID PRIMARY KEY,
    user_id              UUID NOT NULL,
    headline             VARCHAR(200),
    bio                  TEXT,
    location             VARCHAR(150),
    target_role          VARCHAR(150),
    years_of_experience  INTEGER,
    phone_number         VARCHAR(20),
    linkedin_url         VARCHAR(255),
    github_url           VARCHAR(255),
    portfolio_url        VARCHAR(255),
    created_at           TIMESTAMP NOT NULL DEFAULT now(),
    updated_at           TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT uq_user_profiles_user_id UNIQUE (user_id)
);

CREATE INDEX idx_companies_name        ON companies(name);
CREATE INDEX idx_companies_industry    ON companies(industry);
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
