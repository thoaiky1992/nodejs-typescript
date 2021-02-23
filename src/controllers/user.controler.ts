import { JsonController, Get, UseBefore } from 'routing-controllers';
import { UserModel } from '../models/user.model';
import CrudController from './crud.controller';
import UserService from '../services/user.service';
import AuthMiddleware from '../middleware/authenticate';

@UseBefore(AuthMiddleware)
@JsonController('/users')
export class UserController extends CrudController<UserModel> {
  constructor(){
    super(UserService);
  }
}
