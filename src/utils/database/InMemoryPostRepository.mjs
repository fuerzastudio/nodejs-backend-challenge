import { IPostRepository } from './IPostRepository.mjs';

export class InMemoryPostRepository extends IPostRepository {
  items = [];

  create(post) {
    this.items.push(post);
  };

  findAll(page) {
    page = page || 0;

    let data = this.items.slice((page - 1) * 10, page * 10);

    return {
      data,
      total: this.items.length
    };
  }

  findById(id) {
    return this.items.find(post => post.id === id);
  }

  update(id, data) {
    const post = this.items.find(post => post.id === id);
    Object.assign(post, data);
  }

  delete(id) {
    this.items = this.items.filter(post => post.id !== id);
  }
}