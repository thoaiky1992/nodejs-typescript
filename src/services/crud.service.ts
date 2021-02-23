import { Model } from "sequelize-typescript";
import { NotFoundError } from "routing-controllers";
import { FindOptions } from "sequelize";

export default class CrudService<T extends Model<T>> {
  private _model: any;
  constructor(model: any) {
    this._model = model
  }
  async getMany(queryPrams:any): Promise<any> {
    let options: FindOptions = {};
    const count = await this._model.count();
    const page = queryPrams.page ? Number(queryPrams.page) : 1
    const limit = queryPrams.limit ? Number(queryPrams.limit) : count; 
    const offset = queryPrams.page ? Number((page - 1) * limit) : 0;
    options.offset = offset;
    options.limit = limit;
    const data = this.convertToPlainObject(await this._model.findAll(options));
    return {
      rows: data,
      page,
      limit,
      count
    }
  }
  async getOne(id:number): Promise<T> {
    const instance = await this._model.findByPk(id);
    if(!instance){
      throw new NotFoundError(`Instance not found !!!`);
    }
    return this.convertToPlainObject(instance);
  }
  async createOne(dto:any): Promise<T> {
    const instance = await this._model.create(dto)
    return this.convertToPlainObject(instance);
  }
  async updateOne(id:number, dto: any): Promise<T> {
    const instance = await this._model.findByPk(id);
    if(!instance){
      throw new NotFoundError(`Instance not found !!!`);
    }
    const instanceUpdated = await instance.update(dto);
    return this.convertToPlainObject(instanceUpdated);
  }
  async deleteOne(id:number): Promise<boolean> {
    const instance = await this._model.findByPk(1);
    if(instance){
      await instance.destroy();
      return true;
    }
    return false;
  }
  protected convertToPlainObject<R>(object: R): R {
    return JSON.parse(JSON.stringify(object));
  }
}