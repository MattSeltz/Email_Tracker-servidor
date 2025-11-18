CREATE DATABASE email;

\c email

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL 
);

CREATE TABLE emails(
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) NOT NULL,
  rubro VARCHAR(100) NOT NULL,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  send BOOLEAN DEFAULT false,
  user_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE,
  UNIQUE(email, user_id)
);

CREATE INDEX idx_email_user_id ON emails(user_id);