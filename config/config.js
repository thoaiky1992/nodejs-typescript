const path = require('path');
const chalk = require('chalk');

require('dotenv').config({
  path: path.resolve(__dirname, '..', '.env')
});

const logger = (data) => {
  const sql = String(data).replace('Executing (default): ', '');
  console.log(chalk.red('Executing (default): ') + chalk.green(sql));
}

module.exports = {
  development: {
    dialect: 'postgres',
    host: process.env.MAIN_DB_HOST,
    port: Number(process.env.MAIN_DB_PORT),
    username: process.env.MAIN_DB_USER,
    password: process.env.MAIN_DB_PASSWORD,
    database: process.env.MAIN_DB_NAME,
    // logging: logger
  },
  test: {
    dialect: 'postgres',
    host: process.env.MAIN_DB_HOST,
    port: Number(process.env.MAIN_DB_PORT),
    username: process.env.MAIN_DB_USER,
    password: process.env.MAIN_DB_PASSWORD,
    database: process.env.MAIN_DB_NAME,
  },
  production: {
    dialect: 'postgres',
    host: process.env.MAIN_DB_HOST,
    port: Number(process.env.MAIN_DB_PORT),
    username: process.env.MAIN_DB_USER,
    password: process.env.MAIN_DB_PASSWORD,
    database: process.env.MAIN_DB_NAME,
  }
};