import { Users } from '../src/models/user.model.mjs';
import { InMemoryUserRepository } from '../src/utils/database/in_memory/InMemoryUserRepository.mjs';
import { validate } from 'uuid';

describe('Users', () => {
  let userRepository = new InMemoryUserRepository;
  let users;

  beforeEach(() => {
    userRepository.items = []
    users = new Users(userRepository);
  });

  describe('Criação de Usuário', () => {
    it('should be able to create a new user', async () => {
      const testUser = { name: 'User teste', email: 'teste@mail.com', password: '1234' };
      let user = await users.createUser(testUser);

      const isValidId = validate(user.id);

      expect(isValidId).toBe(true);
      expect(user.email).toBe(testUser.email);
    });
  })
  
  describe('Busca de Usuário por id', () => {
    it('should be able to get a user by id', async () => {
      const testUser = { name: 'User teste', email: 'teste@mail.com', password: '1234' };
      let user = await users.createUser(testUser);

      let resp = await users.getUser(user.id);

      expect(resp.id).toBe(user.id);
    });
  });
  
  describe('Login de Usuário', () => {
    it('should be able to login a user', async () => {
      const testUser = { name: 'User teste', email: 'teste@mail.com', password: '1234' };
      let user = await users.createUser(testUser);

      let resp = await users.login({
        email: testUser.email, 
        password: testUser.password
      });

      expect(resp.id).toBe(user.id);
    });
  });
});
