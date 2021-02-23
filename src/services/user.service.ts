import CrudService from "./crud.service";
import { UserModel } from "../models/user.model";

class UserService extends CrudService<UserModel> {
  constructor(){
    super(UserModel)
  }
}
export default new UserService;