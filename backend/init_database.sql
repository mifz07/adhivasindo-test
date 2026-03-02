-- ===============================
CREATE USER adhivasindo WITH PASSWORD 'adhivasindo';
-- ===============================
CREATE DATABASE develop
OWNER adhivasindo
ENCODING 'UTF8';
-- ===============================
\c develop;
-- ===============================
CREATE SCHEMA IF NOT EXISTS develop AUTHORIZATION adhivasindo;
-- ===============================
ALTER USER adhivasindo SET search_path TO develop;
-- ===============================
GRANT ALL PRIVILEGES ON SCHEMA develop TO adhivasindo;
-- ===============================


-- run it using: psql -U postgres -f init_database.sql