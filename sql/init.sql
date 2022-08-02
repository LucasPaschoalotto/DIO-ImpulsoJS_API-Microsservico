/*Script para criação do DB*/
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS application_users(
    uuid uuid DEFAULT uuid_generate_v4(),
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    PRIMARY KEY (uuid)
);

INSERT INTO application_users (username, password) VALUES ('admin', crypt('passAdmin', '159753'));
INSERT INTO application_users (username, password) VALUES ('User', crypt('passUser', '159753'));