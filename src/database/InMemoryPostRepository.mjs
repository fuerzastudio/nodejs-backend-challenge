import { IPostRepository } from './IPostRepository.mjs';

export class InMemoryPostRepository extends IPostRepository {
  data = [];

  create(post) {
    this.data.push(post);
  };

  getAll(page) {
    page = page || 0;

    return this.data.slice((page - 1) * 10, page * 10)
  }

  findById(id) {
    return this.data.find(post => post.id === id);
  }

}