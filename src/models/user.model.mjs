import { hash } from 'bcrypt';
import { randomUUID } from 'node:crypto'

export class Users {
  
  constructor(IUserRepository) {
    this.userRepository = IUserRepository;
  }
  
  async createUser(userData) {
    const { name, email, password } = userData;

    const user = await this.userRepository.findByEmail(email);

    if (user) {
      throw new Error('User already exists');
    }

    const newUser = {
      id: randomUUID(),
      name,
      email,
      password: await hash(password, 10),
    };

    await this.userRepository.create(newUser);

    return newUser;
  }

  async getUser(id) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } 
}