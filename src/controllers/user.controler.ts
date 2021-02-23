import { JsonController } from 'routing-controllers';
import { UserModel } from '../models/user.model';
import CrudController from './crud.controller';
import UserService from '../services/user.service';

@JsonController('/users')
export class UserController extends CrudController<UserModel> {
  constructor(){
    super(new UserService);
  }
}
