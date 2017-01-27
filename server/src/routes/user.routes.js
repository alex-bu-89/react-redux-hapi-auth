import { UserController } from '../controllers/user.controller';
import { BaseRoutes } from './base.routes';

/**
 * Main (global) routes
 */
const routes = new class UserRoutes extends BaseRoutes {

  /**
   * Constructor
   */
  constructor() {
    const endpointName = '/users';
    super(new UserController(), endpointName);
  }

  /**
   *  create user (POST)
   */
  create() {
    const route = super.create();

    route.config.description = 'Create a new User';

    route.config.validate.payload = {
      name: this.joi.string().required(),
      email: this.joi.string().required(),
      password: this.joi.string().required(),
      access_token: [this.joi.string(), this.joi.number()],
    };

    return route;
  }

  /**
   * Update user (PUT)
   */
  update() {
    const route = super.update();

    route.config.description = 'Update an existing User';

    route.config.validate.payload = {
      name: this.joi.string(),
      email: this.joi.string().email(),
      password: this.joi.string(),
      access_token: [this.joi.string(), this.joi.number()],
    };
    return route;
  }

}();

/**
 * Export public end-points
 */
export default [
  routes.index(),
  routes.view(),
  routes.create(),
  routes.update(),
  routes.remove()
];
