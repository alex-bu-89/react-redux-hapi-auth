import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router'
require("./login.sass");

export default class Login extends Component {
  render() {
    return (
      <div className="container">
        <form className="form-signup">
          <h2 className="form-signin-heading">Please sign up</h2>
          <label for="inputEmail" className="sr-only">Email address</label>
          <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus />
          <input type="input" id="inputName" className="form-control" placeholder="Name" required />
          <label for="inputPassword" className="sr-only">Password</label>
          <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
          <div className="checkbox">
            <label>
              Or <Link to="/login">login</Link>
            </label>
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
      </div>
    );
  }
}
