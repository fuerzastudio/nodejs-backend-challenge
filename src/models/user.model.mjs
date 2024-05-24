import { compare, hash } from 'bcrypt';
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

    return {
      ...newUser,
      password: undefined,
    };
  }

  async getUser(id) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    return {
      ...user,
      password: undefined,
    };
  }

  async login(userData) {
    const { email, password } = userData;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    return {
      ...user,
      password: undefined,
    };
  }
}