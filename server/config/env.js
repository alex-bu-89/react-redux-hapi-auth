module.exports = {

  //
  // Database
  // DB name is defined in: ./config/default.js
  //
  database: {
    client: 'pg',
    connection: {
      host: 'localhost',
      port: 5432,
      user: '',
      password: ''
    }
  },

  //
  // Logging
  //
  logging: {
    console: {
      level: 'debug'
    }
  }
}
