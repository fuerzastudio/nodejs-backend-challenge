import dataSourceConfig from '../../config/databaseConfig.mjs';
import userSchema from '../entitities/userEntity.mjs';
import { IUserRepository } from '../IUserRepository.mjs';

export class TypeORMPostRepository extends IUserRepository {

  constructor() {
    super();
    this.ormRepository = dataSourceConfig.getRepository(userSchema)
  }

  async create(user) {
    return await this.ormRepository.save(user);
  }

  async findById(id) {
    return await this.ormRepository.findOneBy({id});
  }
  
  async findByEmail(email) {
    return await this.ormRepository.findOneBy({email});
  }
}