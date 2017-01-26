import jwt from 'jsonwebtoken';
import { sha256 } from '../../libs/util/auth';
import { User } from '../models/User';
import { BaseController } from './base.controller';

const EXPIRATION_TIME = 60 * 60 * 24;
const SECRET = 'gu9%lgnut^!3of';

export class TokenController extends BaseController {

  /**
   * Constructor
   */
  constructor() {
    const notFoundMsg = 'Token not found';
    super(notFoundMsg);
    this.User = new User();
  }

  /**
   * Find a token [is logged in?]
   * @type {Object}
   */
  view(request, reply) {
    // TODO
    this.handleRequest(this.User.findByToken(request.params.token), reply);
  }

  /**
   * Create a new token when credentials is valid (log in)
   * Save new token to the user
   * @return user
   */
  create(request, reply) {
    const email = request.payload.email;
    const password = sha256(request.payload.password);

    this.checkUserCredentials(email, password)
      .then((user) => {

        // response 401 status if credential not matching
        if (user.length < 1) {
          reply({ status: 401, message: 'email or password is wrong' });
          return false;
        }

        // create jwt token
        const token = jwt.sign(
          {
            user: {
              id: user.id,
              email: user.email,
              name: user.name
            }
          },
          SECRET,
          { expiresIn: EXPIRATION_TIME }
        );

        return this.User.update(user.id, { access_token: token });
      })
      .then((user) => {
        reply(user);
        return user;
      })
      .catch((err) => {
        global.log.info('err checkUserCredentials: ', err);
      });
  }

  update(request, reply) {
    const { id } = request.params;
    const data = request.payload;

    this.handleRequest(this.User.update(id, data), reply);
  }

  remove({ params: { id } }, reply) {
    this.handleRequest(this.User.del(id), reply);
  }

  /**
   * Check user credentials
   */
  checkUserCredentials(email, password) {
    global.log.info('check user credentials', email, password);

    return this.User.findBy('email', email)
      .then((user) => {
        if (user.length < 1) { return []; }

        // compare passwords
        if (user[0].password === password) {
          return user[0];
        }

        return [];
      })
      .catch((err) => {
        global.log.info(err);
        return [];
      });
  }

}
