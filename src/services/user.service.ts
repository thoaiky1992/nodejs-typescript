import CrudService from "./crud.service";
import { UserModel } from "../models/user.model";

export default class UserService extends CrudService<UserModel> {
  constructor(){
    super(UserModel)
  }
}