import { IUserRepository } from '../IUserRepository.mjs';

export class InMemoryUserRepository extends IUserRepository {
  items = [];

  create(user) {
    this.items.push(user);
  };

  findById(id) {
    return this.items.find(user => user.id === id);
  }
  
  findByEmail(email) {
    return this.items.find(user => user.email === email);
  }
}