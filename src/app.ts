import express, { Application } from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import initialRoutes from './routes/index';
import { Sequelize } from 'sequelize-typescript'
export class App {
    private app: Application;

    constructor(private port: number | string | undefined) {
        this.app = express();
        this.middleware();
        this.routes()
    }  
    connectDB() {
        const sequelize = new Sequelize({
            dialect: 'postgres',
            database: 'thoaiky1992',
            username: 'thoaiky1992',
            password: 'thoaiky1992',
            storage: ':memory:',
            port: 5432,
            models: [__dirname + '/*.model.ts'], // or [Player, Team],
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