#! /usr/bin/env node

const { Client } = require('pg');

const SQL = `
  CREATE TABLE IF NOT EXISTS app_password (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    type VARCHAR (255) NOT NULL,
    password VARCHAR (255) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS app_user (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    email VARCHAR (255) UNIQUE NOT NULL,
    first_name VARCHAR (255) NOT NULL,
    last_name VARCHAR (255) NOT NULL,
    password VARCHAR (255) NOT NULL,
    is_member BOOLEAN NOT NULL DEFAULT FALSE,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE,
    created_time TIMESTAMP (6) NOT NULL,
    last_login_time TIMESTAMP (6)
  );

  CREATE INDEX IF NOT EXISTS app_user_email_key ON app_user (email);

  CREATE TABLE IF NOT EXISTS app_message (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INTEGER REFERENCES app_user (id) NOT NULL,
    title VARCHAR (255) NOT NULL,
    text TEXT NOT NULL,
    created_time TIMESTAMP (6) NOT NULL
  );
`;

async function init() {
  try {
    const connectionString = process.argv[2];
    if (!connectionString) throw new Error('No db connection string specified');

    const client = new Client({
      connectionString,
    });

    console.log('Connecting...');
    await client.connect();
    console.log('Creating database tables...');
    await client.query(SQL);
    console.log('Done!');
    await client.end();
    console.log('Disconnected');
  } catch (error) {
    console.error(error);
  }
}

init();
