import { Get, Post, Body, JsonController, Controller, UseBefore} from 'routing-controllers';
import { Model, Sequelize } from "sequelize-typescript";
import { UserModel } from '../models/user.model';
import { UserDto } from '../dto/user/user.dto';

interface InterfaceCrudController<T extends Model<T>> {
  createOne: (dto:any) => Promise<any>
}
export default class CrudController <T extends Model<T>> implements InterfaceCrudController<UserModel>{
  private _model: typeof Model & Model;
  constructor(model: any) {
    this._model = model;
  }
  @Get()
  async getMany(): Promise<T[]> {
    const users = await this._model.findAll();
    return JSON.parse(JSON.stringify(users));
  }
  @Post()
  async createOne(@Body() dto: UserDto): Promise<any> { 
    const user = await this._model.create(dto);
    return JSON.parse(JSON.stringify(user));
  }
}