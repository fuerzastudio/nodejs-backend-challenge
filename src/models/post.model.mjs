import { randomUUID } from 'node:crypto'

export class Posts {
  
  constructor(IPostRepository) {
    this.postRepository = IPostRepository;
  }
  
  async createPost(postData) {
    const newPost = {
      id: randomUUID(),
      ...postData,
    };

    await this.postRepository.create(newPost);

    return newPost;
  }

  async listPosts(page) {
    return this.postRepository.findAll(page);
  }

  async getPost(id) {
    const post = await this.postRepository.findById(id);
    
    if (!post) {
      throw new Error('Post Not Found');
    }

    return post;
  }

  async updatePost(id, postData) {
    const post = this.postRepository.findById(id);

    if (!post) {
      throw new Error('Post Not Found');
    }

    this.postRepository.update(id, postData);

    return postData;
  }

  async deletePost(id) {
    const post = this.postRepository.findById(id);

    if (!post) {
      throw new Error('Post Not Found');
    }

    this.postRepository.delete(id);

    return post;
  }
}