import { Get, Post, Body, Params, Put, Param, QueryParams, Delete} from 'routing-controllers';
import { Model } from "sequelize-typescript";
import { UserDto } from '../dto/user/user.dto';


export default class CrudController <T extends Model<T>> {
  private _service: any;
  constructor(service: any) {
    this._service = service;
  }
  @Get()
  getMany(@QueryParams() queryPrams:any) {
    return this._service.getMany(queryPrams)
  }

  @Get('/:id')
  getOne(@Param('id') id:number ) { 
    return this._service.getOne(id);
  }

  @Post()
  createOne(@Body() dto: UserDto) { 
    return this._service.createOne(dto);
  }

  @Put('/:id')
  updateOne(@Params() id:number, @Body() dto:any) {
    return this._service.updateOne(id,dto);
  }

  @Delete('/:id')
  deleteOne(@Params() id:number) {
    return this._service.deleteOne(id);
  }
}