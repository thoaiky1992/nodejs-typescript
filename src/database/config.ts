import { Sequelize } from "sequelize-typescript"
import { config } from 'dotenv';
import { resolve } from "path";
import { UserModel } from "../models/user.model";
config({path: resolve(__dirname,'..','..','.env')});
class Database {
  public sequelize:any
  constructor(){
    this.connect()
  }
  connect() {
    this.sequelize = new Sequelize({
      dialect: 'postgres',
      database: process.env.MAIN_DB_NAME,
      username: process.env.MAIN_DB_USER,
      password: process.env.MAIN_DB_PASSWORD,
      storage: ':memory:',
      port: Number(process.env.MAIN_DB_PORT),
      models: [UserModel]
    })
  }
}
export default Database;