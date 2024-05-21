import { TypeORMPostRepository } from 'typeorm';

export class TypeORMPostRepository extends IPostRepository {

  async create(post) {
    return await this.ormRepository.save(post);
  }

  async findAll(page) {
    const page = query.page || 0;

    const { result, total } = await this.ormRepository.findAndCount({
      take: 10,
      skip: page,
    });

    return {
      data: result,
      count: total
    }
  }
}