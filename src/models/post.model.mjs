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
}