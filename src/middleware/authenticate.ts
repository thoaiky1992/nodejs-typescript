import { ExpressMiddlewareInterface } from 'routing-controllers';
import { verify } from 'jsonwebtoken';
import { config } from 'dotenv';
import { resolve } from 'path';
config({path: resolve(__dirname, '..', '..', '.env')})

export default class AuthMiddleware implements ExpressMiddlewareInterface {
  use(request: any, response: any, next: (err?: any) => any) {
    let token = request.headers.authorization.split(" ")[1];
    const decode = verify(token, String(process.env.JWT_SECRET));
    request.user = decode;
    next();
  }
}