import { randomUUID } from 'node:crypto'

class Posts {
  
  createPost(postData) {
    const { title, body, tags } = postData;

    const id = randomUUID();

  }
}