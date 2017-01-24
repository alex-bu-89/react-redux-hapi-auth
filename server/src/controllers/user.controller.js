import { sha256 } from '../../libs/util/auth';
import { User } from '../models/User';
import { BaseController } from './base.controller';

export class UserController extends BaseController {

  /**
   * Constructor
   */
  constructor() {
    const notFoundMsg = 'User not found';

    super(notFoundMsg);
    this.User = new User();
  }

  index(request, reply) {
    this.handleRequest(this.User.findAll(), reply);
  }

  view({ params: { id } }, reply) {
    this.handleRequest(this.User.findById(id), reply);
  }

  create(request, reply) {
    // TODO check if email exist

    const data = request.payload;
    data.password = sha256(data.password);

    this.handleRequest(this.User.save(data), reply);
  }

  update(request, reply) {
    const { id } = request.params;
    const data = request.payload;

    this.handleRequest(this.User.update(id, data), reply);
  }

  remove({ params: { id } }, reply) {
    this.handleRequest(this.User.del(id), reply);
  }
}
