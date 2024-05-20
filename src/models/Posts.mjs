import { randomUUID } from 'node:crypto'

class Posts {
  
  constructor(postRepository) {
    this.postRepository = postRepository;
  }
  
  createPost(postData) {
    postData.id = randomUUID();

    return this.postRepository.create(postData);
  }
}