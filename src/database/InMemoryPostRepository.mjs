import { IPostRepository } from './IPostRepository.mjs';

export class InMemoryPostRepository extends IPostRepository {
  data = [];

  create(post) {
    this.data.push(post); 
  };
}