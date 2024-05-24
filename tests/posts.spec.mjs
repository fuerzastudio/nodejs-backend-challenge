import { Posts } from '../src/models/post.model.mjs';
import { InMemoryPostRepository } from '../src/database/in_memory/InMemoryPostRepository.mjs';
import { validate } from 'uuid';
import { postFactory } from './post.factory.mjs';

describe('Posts', () => {
  let postRepository = new InMemoryPostRepository;
  let posts;

  beforeEach(() => {
    postRepository.items = []
    posts = new Posts(postRepository);
  });

  describe('Criação de Post', () => {
    it('should be able to create a new Post', async () => {
      const testPost = { title: 'Test Post', body: 'This is a test post.', tags: ['post', 'test', 'new', 'jest'] };
      let post = await posts.createPost(testPost);

      const isValidId = validate(post.id);

      expect(isValidId).toBe(true);
      expect(post.title).toBe(testPost.title);
      expect(post.body).toBe(testPost.body);
      expect(post.tags).toBe(testPost.tags);
    });
  });

  describe('Busca por todos os Post', () => {
    it('should be able to get all first 10 posts', async () => {
      for (let i = 0; i < 22; i++) {
        await postFactory.create({}, postRepository);
      }

      let resp = await posts.listPosts(1);
      expect(resp.data.length).toBe(10);
    });
    
    it('should be able to get just two posts', async () => {
      for (let i = 0; i < 2; i++) {
        await postFactory.create({}, postRepository);
      }

      let resp = await posts.listPosts(1);

      expect(resp.data.length).toBe(2);
    });
    
    it('should be able to get just two posts (lasts)', async () => {
      for (let i = 0; i < 22; i++) {
        await postFactory.create({}, postRepository);
      }

      let resp = await posts.listPosts(3);

      expect(resp.data.length).toBe(2);
    });
  });

  describe('Busca de Post por id', () => {
    it('should be able to get a post by id', async () => {
      const post = await postFactory.create({}, postRepository);

      let resp = await posts.getPost(post.id);

      expect(resp.id).toBe(post.id);
    });
    
    // it('should not be able get a post by id', async () => {
    //   await expect(posts.getPost('1')).rejects.toThrowError('Post Not Found');
    // });
  });

  describe('Atualizacao de Post', () => {
    it('should be able to update a post', async () => {
      const post = await postFactory.create({}, postRepository);

      const newPost = { title: 'New Title', body: 'New Body', tags: ['new', 'post'] };

      let resp = await posts.updatePost(post.id, newPost);

      expect(resp.title).toBe(newPost.title);
      expect(resp.body).toBe(newPost.body);
      expect(resp.tags).toBe(newPost.tags);
    });
    
    // it('should not be able to update a post that not exists', async () => {
    //   const newPost = { title: 'New Title', body: 'New Body', tags: ['new', 'post'] };

    //   await expect(posts.updatePost('1', newPost)).rejects.toThrowError('Post Not Found');
    // });
  });

  describe('Deletar Post', () => {
    it('should be able to delete a post', async () => {
      const post = await postFactory.create({}, postRepository);

      let resp = await posts.deletePost(post.id);

      expect(resp).toBe(post);
    });
    
    // it('should not be able to delete a post', async () => {
    //   await expect(posts.updatePost('1', newPost)).rejects.toThrowError('Post Not Found');
    // });
  });
});
