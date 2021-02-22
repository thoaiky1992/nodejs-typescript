import express, { Application } from 'express';
import { createExpressServer } from 'routing-controllers';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
import { resolve } from 'path';
import Database from './database/config';
import cors from 'cors';

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
        new Database();
    } 
    middleware() {
        this.app.use(morgan('dev'))
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended:true}));
        this.app.use(cors())
    }
    routes() {
        this.app = createExpressServer({
            routePrefix: 'api',
            controllers: [__dirname + '/controllers/*.ts']
        })
    }
    async listen() {
        await this.app.listen(this.port || process.env.PORT || 3000);
        console.log('Server on port : ', this.port);  
    }
}