-- insert records after the tables are created
-- bcrypt hash for 'password' is '$2a$12$X2kmbuZD2O8nAxDMmUUbdOhxKw9I/7z5GZirfasDDFCht4U7rBI9m'
INSERT INTO
  users (username, weight, email, password)
VALUES
  (
    'test1',
    65,
    'test1@example.com',
    '$2a$12$X2kmbuZD2O8nAxDMmUUbdOhxKw9I/7z5GZirfasDDFCht4U7rBI9m' -- password
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
      strftime ('%s', '2024-11-01T20:00:00Z'),
      strftime ('%s', '2024-11-01T20:00:00Z')
    ),
    (
      1,
      70,
      3,
      strftime ('%s', '2024-11-02T20:00:00Z'),
      strftime ('%s', '2024-11-02T20:00:00Z')
    ),
    (
      1,
      80,
      2,
      strftime ('%s', '2024-11-03T20:00:00Z'),
      strftime ('%s', '2024-11-03T20:00:00Z')
    ),
    (
      1,
      120,
      4,
      strftime ('%s', '2024-11-04T20:00:00Z'),
      strftime ('%s', '2024-11-04T20:00:00Z')
    ),
    (
      1,
      131,
      5,
      strftime ('%s', '2024-11-05T20:00:00Z'),
      strftime ('%s', '2024-11-05T20:00:00Z')
    ),
    (
      1,
      139,
      5,
      strftime ('%s', '2024-11-06T20:00:00Z'),
      strftime ('%s', '2024-11-06T20:00:00Z')
    ),
    (
      1,
      30,
      1,
      strftime ('%s', '2024-11-07T20:00:00Z'),
      strftime ('%s', '2024-11-07T20:00:00Z')
    ),
    (
      1,
      90,
      3,
      strftime ('%s', '2024-11-08T20:00:00Z'),
      strftime ('%s', '2024-11-08T20:00:00Z')
    ),
    (
      1,
      110,
      4,
      strftime ('%s', '2024-11-09T20:00:00Z'),
      strftime ('%s', '2024-11-09T20:00:00Z')
    ),
    (
      1,
      95,
      3,
      strftime ('%s', '2024-11-10T20:00:00Z'),
      strftime ('%s', '2024-11-10T20:00:00Z')
    ),
    (
      1,
      150,
      5,
      strftime ('%s', '2024-11-11T20:00:00Z'),
      strftime ('%s', '2024-11-11T20:00:00Z')
    ),
    (
      1,
      60,
      2,
      strftime ('%s', '2024-11-12T20:00:00Z'),
      strftime ('%s', '2024-11-12T20:00:00Z')
    ),
    (
      1,
      120,
      4,
      strftime ('%s', '2024-11-13T20:00:00Z'),
      strftime ('%s', '2024-11-13T20:00:00Z')
    ),
    (
      1,
      70,
      3,
      strftime ('%s', '2024-11-14T20:00:00Z'),
      strftime ('%s', '2024-11-14T20:00:00Z')
    ),
    (
      1,
      80,
      2,
      strftime ('%s', '2024-11-15T20:00:00Z'),
      strftime ('%s', '2024-11-15T20:00:00Z')
    ),
    (
      1,
      120,
      4,
      strftime ('%s', '2024-11-16T20:00:00Z'),
      strftime ('%s', '2024-11-16T20:00:00Z')
    ),
    (
      1,
      131,
      5,
      strftime ('%s', '2024-11-17T20:00:00Z'),
      strftime ('%s', '2024-11-17T20:00:00Z')
    ),
    (
      1,
      139,
      5,
      strftime ('%s', '2024-11-18T20:00:00Z'),
      strftime ('%s', '2024-11-18T20:00:00Z')
    ),
    (
      1,
      30,
      1,
      strftime ('%s', '2024-11-19T20:00:00Z'),
      strftime ('%s', '2024-11-19T20:00:00Z')
    ),
    (
      1,
      90,
      3,
      strftime ('%s', '2024-11-20T20:00:00Z'),
      strftime ('%s', '2024-11-20T20:00:00Z')
    ),
    (
      1,
      110,
      4,
      strftime ('%s', '2024-11-21T20:00:00Z'),
      strftime ('%s', '2024-11-21T20:00:00Z')
    ),
    (
      1,
      95,
      3,
      strftime ('%s', '2024-11-22T20:00:00Z'),
      strftime ('%s', '2024-11-22T20:00:00Z')
    ),
    (
      1,
      150,
      5,
      strftime ('%s', '2024-11-23T20:00:00Z'),
      strftime ('%s', '2024-11-23T20:00:00Z')
    ),
    (
      1,
      60,
      2,
      strftime ('%s', '2024-11-24T20:00:00Z'),
      strftime ('%s', '2024-11-24T20:00:00Z')
    ),
    (
      1,
      120,
      4,
      strftime ('%s', '2024-11-25T20:00:00Z'),
      strftime ('%s', '2024-11-25T20:00:00Z')
    ),
    (
      1,
      70,
      3,
      strftime ('%s', '2024-11-26T20:00:00Z'),
      strftime ('%s', '2024-11-26T20:00:00Z')
    ),
    (
      1,
      80,
      2,
      strftime ('%s', '2024-11-27T20:00:00Z'),
      strftime ('%s', '2024-11-27T20:00:00Z')
    ),
    (
      1,
      120,
      4,
      strftime ('%s', '2024-11-28T20:00:00Z'),
      strftime ('%s', '2024-11-28T20:00:00Z')
    ),
    (
      1,
      131,
      5,
      strftime ('%s', '2024-11-29T20:00:00Z'),
      strftime ('%s', '2024-11-29T20:00:00Z')
    ),
    (
      1,
      139,
      5,
      strftime ('%s', '2024-11-30T20:00:00Z'),
      strftime ('%s', '2024-11-30T20:00:00Z')
    );
