import { Posts } from '../src/models/post.model.mjs';
import { InMemoryPostRepository } from '../src/database/InMemoryPostRepository.mjs';
import { validate } from 'uuid';
import { postFactory } from './post.factory.mjs';

describe('Posts', () => {
  let postRepository = new InMemoryPostRepository;
  let posts;

  beforeEach(() => {
    postRepository.data = []
    posts = new Posts(postRepository);
  });

  describe('createPost', () => {
    it('should be able to create a new Post', () => {
      const testPost = { title: 'Test Post', body: 'This is a test post.', tags: ['post', 'test', 'new', 'jest'] };
      let post = posts.createPost(testPost);

      const isValidId = validate(post.id);

      expect(isValidId).toBe(true);
      expect(post.title).toBe(testPost.title);
      expect(post.body).toBe(testPost.body);
      expect(post.tags).toBe(testPost.tags);
    });
  });

  describe('getAllPosts', () => {
    it('should be able to get all first 10 posts', async () => {
      for (let i = 0; i < 22; i++) {
        await postFactory.create({}, postRepository);
      }

      let resp = posts.listPosts(1);
      expect(resp.length).toBe(10);
    });
    
    it('should be able to get just two posts', async () => {
      for (let i = 0; i < 2; i++) {
        await postFactory.create({}, postRepository);
      }

      let resp = posts.listPosts(1);

      expect(resp.length).toBe(2);
    });
    
    it('should be able to get just two posts (lasts)', async () => {
      for (let i = 0; i < 22; i++) {
        await postFactory.create({}, postRepository);
      }

      let resp = posts.listPosts(3);

      expect(resp.length).toBe(2);
    });
  });

  describe('getPostById', () => {
    it('should be able to get a post by id', async () => {
      const post = await postFactory.create({}, postRepository);

      let resp = await posts.getPost(post.id);

      expect(resp.id).toBe(post.id);
    });
    
    // it('should not be able get a post by id', async () => {
    //   await expect(posts.getPost('1')).rejects.toThrowError('Post Not Found');
    // });
  });
});
