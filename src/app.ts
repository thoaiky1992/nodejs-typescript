import express, { Application } from 'express';
import { createExpressServer } from 'routing-controllers';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
import { resolve } from 'path';
import Database from './database/config';
import cors from 'cors';
import SocketIoJwt from './socker.io';
import { createServer } from "http";
import { Server, Socket } from "socket.io";


config({path: resolve(__dirname,'..','.env')})

export class App {
    public app: Application;
    public httpServer:any;

    constructor(private port: number | string | undefined) {
        this.app = express();
        this.middleware();
        this.routes();
        this.connectSocketIo();
        this.connectDB();
    }  
    connectSocketIo() {
        const io = new Server(this.httpServer);
        io.on("connection",(socket:any) => {
            console.log(socket);
            socket.on("test",(data:any) => console.log(data));
        })
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
    async routes() {
        this.app = createExpressServer({
            routePrefix: 'api',
            cors: {
              origin: '*'  
            },
            controllers: [__dirname + '/controllers/*.ts']
        })
        this.httpServer = createServer(this.app);
    }
    async listen() {
        this.httpServer.listen(3000)
        // await this.app.listen(this.port || process.env.PORT || 3000);
        console.log('Server on port : ', this.port);  
    }
}