import { randomUUID } from 'node:crypto'

export class Posts {
  
  constructor(postRepository) {
    this.postRepository = postRepository;
  }
  
  createPost(postData) {
    postData.id = randomUUID();

    this.postRepository.create(postData)

    return postData;
  }

  listPosts(page) {
    return this.postRepository.getAll(page);
  }

  getPost(id) {
    const post = this.postRepository.findById(id);
    
    if (!post) {
      throw new Error('Post Not Found');
    }

    return post;
  }

  updatePost(id, postData) {
    const post = this.postRepository.findById(id);

    if (!post) {
      throw new Error('Post Not Found');
    }

    this.postRepository.update(id, postData);

    return postData;
  }

  deletePost(id) {
    const post = this.postRepository.findById(id);

    if (!post) {
      throw new Error('Post Not Found');
    }

    this.postRepository.delete(id);

    return post;
  }
}