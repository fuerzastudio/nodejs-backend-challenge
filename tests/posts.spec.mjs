import { Posts } from '../src/models/post.model.mjs';
import { InMemoryPostRepository } from '../src/database/InMemoryPostRepository.mjs';
import { validate } from 'uuid';

describe('Posts', () => {
  let postRepository = new InMemoryPostRepository;
  let posts;

  beforeEach(() => {
    posts = new Posts(postRepository);
  });

  describe('createPost', () => {
    it('should create a new Post', () => {
      const testPost = { title: 'Test Post', body: 'This is a test post.', tags: ['post', 'test', 'new', 'jest'] };
      let post = posts.createPost(testPost);

      const isValidId = validate(post.id);

      expect(isValidId).toBe(true);
      expect(post.title).toBe(testPost.title);
      expect(post.body).toBe(testPost.body);
      expect(post.tags).toBe(testPost.tags);
    });
  });
});
