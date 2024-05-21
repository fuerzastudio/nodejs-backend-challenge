import { IPostRepository } from "./IPostRepository.mjs";
import postSchema from './entitities/postEntity.mjs';
import dataSourceConfig from '../config/databaseConfig.mjs';
export class TypeORMPostRepository extends IPostRepository {

  constructor() {
    super();
    this.ormRepository = dataSourceConfig.getRepository(postSchema)
  }

  async create(post) {
    return await this.ormRepository.save(post);
  }

  async findAll(page) {
    page = page || 0;

    const [ result, total ] = await this.ormRepository.findAndCount({
      take: 10,
      skip: page,
    });

    return {
      data: result,
      count: total
    }
  }

  async findById(id) {
    return await this.ormRepository.findOneBy({id});
  }

  async update(id, data) {
    return await this.ormRepository.update({id, data});
  }

  async delete(id) {
    return await this.ormRepository.delete({id});
  }
}