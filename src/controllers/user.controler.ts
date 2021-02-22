import { JsonController } from 'routing-controllers';
import { UserModel } from '../models/user.model';
import CrudController from './crud.controller';

@JsonController('/users')
export class UserController extends CrudController<UserModel> {
  constructor(){
    super(UserModel);
  }
}
