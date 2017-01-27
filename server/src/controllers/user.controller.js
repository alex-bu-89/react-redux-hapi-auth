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

  /**
   * Get all users [GET]
   */
  index(request, reply) {
    this.handleRequest(this.User.findAll(), reply);
  }

  /**
   * Get user by id [GET:id]
   * {params} obj
   */
  view({ params: { id } }, reply) {
    this.handleRequest(this.User.findById(id), reply);
  }

  /**
   * Create user [POST]
   */
  create(request, reply) {
    global.log.info({ action: 'CREATING USER', payload: request.payload });
    const data = request.payload;
    data.password = sha256(data.password); // hashing password with sha 256

    // TODO check if email exist
    this.User.save(data)
      .then((user) => {
        if ((Array.isArray(user) && user.length) || user > 0) {
          reply(user);
        }
        else {
          this.Boom.badRequest('Not Found');
        }
      })
      .throw((err) => {
        this.Boom.wrap(err, 400);
      });
  }

  /**
   * Update user [PUT:id]
   */
  update(request, reply) {
    const { id } = request.params;
    const data = request.payload;

    this.handleRequest(this.User.update(id, data), reply);
  }

  /**
   * Delete user [DELETE:id]
   */
  remove({ params: { id } }, reply) {
    this.handleRequest(this.User.del(id), reply);
  }
}
