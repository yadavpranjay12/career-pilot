-- 1. Delete existing dummy data to avoid NOT NULL constraint errors on the new column
DELETE FROM internship_applications; -- (If any exist, to avoid foreign key blocks)
DELETE FROM companies;

-- 2. Add the user_id column
ALTER TABLE companies ADD COLUMN user_id UUID NOT NULL;

-- 3. Remove the unique constraint on the name column
-- Note: Replace 'companies_name_key' with the actual constraint name if Postgres named it differently.
ALTER TABLE companies DROP CONSTRAINT IF EXISTS companies_name_key;

-- 4. Create an index for faster lookups by user
CREATE INDEX idx_companies_user_id ON companies(user_id);