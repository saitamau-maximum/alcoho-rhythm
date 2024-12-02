#!/bin/bash

# check if the table exists
DATABASE_PATH="./database.db"
table_exists=$(sqlite3 $DATABASE_PATH "SELECT name FROM sqlite_master WHERE type='table' AND name IN ('users', 'drinking_records');")
if [ "$(echo $table_exists | grep 'users')" ] && [ "$(echo $table_exists | grep 'drinking_records')" ]; then
  table_exists=true
else
  table_exists=false
fi

# if the table exists, load the SQL file for testing
if [ "$table_exists" ]; then
  cat ./sql/0_test_data.sql | sqlite3 $DATABASE_PATH
  echo "SQL file loaded successfully."
else
  echo "Table does not exist. Please start the server first."
fi
