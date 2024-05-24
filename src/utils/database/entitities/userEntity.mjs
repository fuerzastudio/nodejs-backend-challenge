import { EntitySchema } from 'typeorm';

const userSchema = new EntitySchema({
  name: 'Users',
  columns: {
    id: {
      primary: true,
      type: 'text',
    },
    name: {
      type: 'varchar',
    },
    email: {
      type: 'text',
    },
    password: {
      type: 'varchar',
      array: true
    }
  },
});

export default userSchema;