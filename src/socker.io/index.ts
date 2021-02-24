import io from 'socket.io';
import { config } from 'dotenv';
import { resolve } from 'path';
import jwt from 'jsonwebtoken'
import { App } from '../app';

config({path: resolve(__dirname, '..', '..', '.env')});
export default class SocketIoJwt {
  public _server:any;
  constructor(app:any) {
    this._server = io(app);
    this.configAuthenticateJwt(); 
    this.connect()
  }
  configAuthenticateJwt() {
    this._server.use((socket: any, next: any) => {
      if(socket.handshake?.query && socket.handshake?.query?.token) {
        const token = String(socket.handshake?.query?.token);
        const decode = jwt.verify(token, String(process.env.JWT_SECRET));
        if(!decode) return next(new Error('Authentication error'));
        socket.user = decode;
        next();
      }
    })
  }
  connect() {
    this._server.on('connection', (socket:any) => {
      console.log(socket);
    })
  }
  
}
