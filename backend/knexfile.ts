import path from 'path'

const config = require('./dblocales')

module.exports = {
  client: 'pg',
  connection: config.development.database,
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations')
  },
};

console.log(config.development.database)