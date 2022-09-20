const { Pool, Client } = require('pg')
exports.pool = new Pool({
  user: 'kwhubpfs',
  host: 'balarama.db.elephantsql.com',
  database: 'kwhubpfs',
  password: 'ltOyo-P09HmQTTljio6VnGvfG8cjfY9d',
  port: 5432,
})