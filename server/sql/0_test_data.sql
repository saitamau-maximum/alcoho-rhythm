-- insert records after the tables are created
-- bcrypt hash for 'password' is '$2a$12$X2kmbuZD2O8nAxDMmUUbdOhxKw9I/7z5GZirfasDDFCht4U7rBI9m'
INSERT INTO
  users (username, weight, email, password)
VALUES
  (
    'test1',
    65,
    'test1@example.com',
    '$2a$12$X2kmbuZD2O8nAxDMmUUbdOhxKw9I/7z5GZirfasDDFCht4U7rBI9m'
  ),
  (
    'test2',
    45,
    'test2@example.com',
    '$2a$12$X2kmbuZD2O8nAxDMmUUbdOhxKw9I/7z5GZirfasDDFCht4U7rBI9m'
  ),
  (
    'test3',
    50,
    'test3@example.com',
    '$2a$12$X2kmbuZD2O8nAxDMmUUbdOhxKw9I/7z5GZirfasDDFCht4U7rBI9m'
  );

INSERT INTO
  drinking_records (
    user_id,
    alcohol_amount,
    condition,
    date,
    updated_at
  )
VALUES
  (
    1,
    120,
    4,
    strftime ('%s', '2024-11-03T20:00:00Z'),
    strftime ('%s', '2024-11-03T20:00:00Z')
  ),
  (
    1,
    150,
    5,
    strftime ('%s', '2024-11-04T20:00:00Z),
    strftime ('%s',  
  ),
  (
    1,
    80,
    2,
    strftime ('%s', '2024-11-09T20:00:00Z'),
    strftime ('%s', '2024-11-09T20:00:00Z')
  ),
  (
    1,
    139,
    5,
    strftime ('%s', '2024-11-17T20:00:00Z'),
    strftime ('%s', '2024-11-17T20:00:00Z')
  ),
  (
    1,
    30,
    1,
    strftime ('%s', '2024-11-25T20:00:00Z'),
    strftime ('%s', '2024-11-25T20:00:00Z')
  ),
  (
    2,
    100,
    3,
    strftime ('%s', '2024-11-03T20:00:00Z'),
    strftime ('%s', '2024-11-03T20:00:00Z')
  ),
  (
    2,
    200,
    5,
    strftime ('%s', '2024-11-09T20:00:00Z'),
    strftime ('%s', '2024-11-09T20:00:00Z')
  ),
  (
    2,
    150,
    4,
    strftime ('%s', '2024-11-17T20:00:00Z'),
    strftime ('%s', '2024-11-17T20:00:00Z')
  ),
  (
    3,
    100,
    3,
    strftime ('%s', '2024-11-03T20:00:00Z'),
    strftime ('%s', '2024-11-03T20:00:00Z')
  ),
  (
    3,
    200,
    5,
    strftime ('%s', '2024-11-09T20:00:00Z'),
    strftime ('%s', '2024-11-09T20:00:00Z')
  ),
  (
    3,
    150,
    4,
    strftime ('%s', '2024-11-17T20:00:00Z'),
    strftime ('%s', '2024-11-17T20:00:00Z')
  );
