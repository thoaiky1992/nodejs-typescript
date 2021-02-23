import { JsonController, Post, Body, UnauthorizedError, NotFoundError, HttpError } from "routing-controllers";
import { sign } from 'jsonwebtoken';
import { UserModel } from "../models/user.model";
import { config } from 'dotenv';
import { resolve } from 'path';
import bcrypt from 'bcrypt';
config({path: resolve(__dirname, '..', '..', '.env')})

@JsonController('/auth')
class Authenticate {
  @Post('/login')
  async login(@Body() dto:any) {
    const user = await UserModel.findOne({
      attributes: {
        include: ['password']
      },
      where: {
        email: dto.email
      }
    });
    if(!user){
      throw new NotFoundError("Email not exist !!!")
    }
    const match = bcrypt.compareSync(dto.password, user.password);
    if(!match){
      throw new HttpError(500, "Password not match");
    }
    const token = sign(JSON.parse(JSON.stringify(user)), String(process.env.JWT_SECRET) , { 
      expiresIn: process.env.JWT_EXPIRESIN 
    })
    return { token };
  }
}
export default Authenticate;