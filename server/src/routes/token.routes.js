import { TokenController } from '../controllers/token.controller';
import { BaseRoutes } from './base.routes';

/**
 * Main (global) routes
 */
const routes = new class TokenRoutes extends BaseRoutes {

  /**
   * Constructor
   */
  constructor() {
    const endpointName = '/token';
    super(new TokenController(), endpointName);
  }

  /**
   *  create token
   */
  create() {
    const route = super.create();
    route.config.description = 'Create a new token';
    route.config.validate = {
      payload: {
        email: this.joi.string().required().description('Email'),
        password: this.joi.string().required().description('Password'),
        hashed: this.joi.boolean()
      }
    };
    return route;
  }

  /**
   * Update token
   */
  update() {
    const route = super.update();
    route.config.description = 'Update an token';

    return route;
  }

}();

/**
 * Export public end-points
 */
export default [
  routes.create(),
  routes.update(),
  routes.remove()
];
