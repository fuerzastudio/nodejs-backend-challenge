import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';

export const postFactory = {
  build: (overrides = {}) => {
    return {
      id: uuidv4(),
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(),
      tags: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
      ...overrides,
    };
  },

  create: async (overrides = {}, repository) => {
    const post = postFactory.build(overrides);
    await repository.create(post);
    return post;
  },
};

export default postFactory;