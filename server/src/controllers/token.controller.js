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
    // TODO expire token
    this.handleRequest(this.User.findByToken(request.params.token), reply);
  }

  /**
   * Create a new token if credentials is valid (log in)
   * Save new token to the user
   * @return user
   */
  create(request, reply) {
    global.log.info({ action: 'CREATING TOKEN', payload: request.payload });

    // return 401 error if email or password is missing
    if (!request.payload.email || !request.payload.password) {
      reply({
        message: 'email or password is missing'
      }).code(401);

      return false;
    }

    const email = request.payload.email;
    const password = request.payload.hashed ? request.payload.password : sha256(request.payload.password);

    // Check check user credentials
    // Create new token if user is valid
    // Update user token
    return this.checkUserCredentials(email, password)
      .then((user) => {

        // response 401 status if credential not matching
        if (!user) {
          reply({ message: 'email or password is wrong' }).code(401);
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
        reply({ access_token: user[0].access_token });
      })
      .catch((err) => {
        global.log.info('err checkUserCredentials: ', err);
      });
  }

  /**
   * Update token
   * @return user
   */
  update(request, reply) {
    const { id } = request.params;
    const data = request.payload;

    this.handleRequest(this.User.update(id, data), reply);
  }

  /**
   * Remove token
   * @return user
   */
  remove({ params: { id } }, reply) {
    this.handleRequest(this.User.del(id), reply);
  }

  /**
   * Check user credentials
   * @type {String} email
   * @type {String} password
   * @return user if success; otherwise false
   */
  checkUserCredentials(email, password) {
    return this.User.findBy('email', email)
      .then((user) => {

        // return false if user not found
        if (global._.isEmpty(user)) { return false; }

        // compare hashed passwords and return user
        if (user[0].password === password) {
          return user[0];
        }

        // otherwise return false
        return false;
      })
      .catch((err) => {
        global.log.info(err);
        return false;
      });
  }
}
