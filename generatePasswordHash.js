#! /usr/bin/env node

const bcrypt = require('bcryptjs');

async function main() {
  const input = process.argv[2];
  const saltLength = parseInt(process.argv[3]) || 10;
  if (!input) throw new Error('No input password provided');

  const hash = await bcrypt.hash(input, saltLength);
  console.log(hash);
}

main();
