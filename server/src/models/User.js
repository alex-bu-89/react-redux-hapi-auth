import { BaseModelRDMS } from './BaseModel.RDMS';

//
// Main
//
export class User extends BaseModelRDMS {

  /**
   * Constructor
   */
  constructor() {
    const tableName = 'users';
    super(tableName);
  }
}
