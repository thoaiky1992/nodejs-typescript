import express, { Application } from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import initialRoutes from './routes/index';
import { Sequelize } from 'sequelize-typescript'
import { UserModel } from './models/user.model';
import { config } from 'dotenv';
import { resolve } from 'path';


config({path: resolve(__dirname,'..','.env')})

export class App {
    private app: Application;

    constructor(private port: number | string | undefined) {
        this.app = express();
        this.middleware();
        this.routes();
        this.connectDB();
    }  
    connectDB() {
        const sequelize = new Sequelize({
            dialect: 'postgres',
            database: process.env.MAIN_DB_NAME,
            username: process.env.MAIN_DB_USER,
            password: process.env.MAIN_DB_PASSWORD,
            storage: ':memory:',
            port: Number(process.env.MAIN_DB_PORT),
            models: [UserModel], // or [Player, Team],
        })
    } 
    middleware() {
        this.app.use(morgan('dev'))
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended:false}));
    }
    routes() {
        this.app.use('/api',initialRoutes);
    }
    async listen() {
        await this.app.listen(this.port || process.env.PORT || 3000);
        console.log('Server on port : ', this.port);  
    }
}