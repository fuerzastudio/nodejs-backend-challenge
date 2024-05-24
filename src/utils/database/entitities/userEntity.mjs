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
      type: 'varchar',
    },
    password: {
      type: 'varchar',
    }
  },
});

export default userSchema;