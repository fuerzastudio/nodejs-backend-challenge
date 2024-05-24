import { EntitySchema } from 'typeorm';

const postSchema = new EntitySchema({
  name: 'Posts',
  columns: {
    id: {
      primary: true,
      type: 'text',
    },
    title: {
      type: 'varchar',
    },
    body: {
      type: 'text',
    },
    tags: {
      type: 'varchar',
      array: true
    }
  },
});

export default postSchema;