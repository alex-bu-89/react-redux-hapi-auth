import { BaseModelRDMS } from './BaseModel.RDMS';

/**
 * Main
 */
export class User extends BaseModelRDMS {

  /**
   * Constructor
   */
  constructor() {
    const tableName = 'users';
    super(tableName);
  }

  /**
   * Find user by token
   */
  findByToken(token) {
    this.Knex(this.tableName).whereIn('access_token', token);
  }

}
