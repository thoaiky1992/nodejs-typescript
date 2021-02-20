import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/user.model";

export default class UserController {
  static async getAll(req: Request, res: Response, next: NextFunction ) {
    const users =  await UserModel.findAll();
    res.json(users);
  }
  static async update(req: Request, res: Response, next: NextFunction ) {
    const data = req.body;
    const user = await UserModel.findByPk(1)
    if(user) {
      const userUpdate = await user.update(data);
      return res.json(userUpdate);
    }
    return res.status(500).json({message: "User not found"})
  }

}