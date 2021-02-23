import socketIO from 'socket.io';
import { config } from 'dotenv';
import { resolve } from 'path';
import jwt from 'jsonwebtoken'
import { App } from '../app';

config({path: resolve(__dirname, '..', '..', '.env')});
export default class SocketIo {
  public _server: socketIO.Server = socketIO((new App(3000)).app);
  constructor() {
    this.connect(); 
  }
  connect() {
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
}
