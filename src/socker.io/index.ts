import { config } from 'dotenv';
import { resolve } from 'path';
import jwt from 'jsonwebtoken'
import { Server } from "socket.io";

config({path: resolve(__dirname, '..', '..', '.env')});
export default class SocketIoJwt {
  public _server:any;
  constructor() {
    this._server = new Server(4000,{
      cors: {
        origin: '*'
      }
    });
    this.configAuthenticateJwt(); 
    this.connect()
  }
  configAuthenticateJwt() {
    this._server.use(async (socket: any, next: any) => {
      if(socket.handshake?.headers?.authorization) {
        const token = socket.handshake.headers.authorization.split(' ')[1];
        const decode = await jwt.verify(token, String(process.env.JWT_SECRET));
        if(!decode) {
          return next(new Error('Authentication error'));
        }
        socket.user = decode;
        next();
      }
    })
  }
  connect() {
    this._server.on('connection', (socket:any) => {
      console.log(socket.user)
    })
  }
  
}
