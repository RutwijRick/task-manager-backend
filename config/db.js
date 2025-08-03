import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// Tried to create a database automatically but Docker was not working on my PC
// const sequelizeRoot = new Sequelize('', DB_USER, DB_PASSWORD, {
//     host: DB_HOST,
//     dialect: 'mysql',
//     logging: false,
// });

// const createDatabaseIfNotExists = async () => {
//     await sequelizeRoot.query(`CREATE DATABASE IF NOT EXISTS \\`${ DB_NAME }\\`;`);
// };

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    logging: false,
});

export default sequelize;