import React, { Component } from 'react';
import { Link } from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

require("./login.sass");

class Login extends Component {

  handleClick(event) {
    event.preventDefault();
    // TODO check validity
    this.props.actions.login(this.refs.email.value, this.refs.password.value, '/dashboard');
  }

  render() {
    return (
      <div className="container">
        <form className="form-signin">
          <h2 className="form-signin-heading">Please log in</h2>
          <input type="email" ref="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus />
          <input type="password" ref="password" id="inputPassword" className="form-control" placeholder="Password" required />
          <button onClick={this.handleClick.bind(this)} className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
          <div className="bottom-link">
            <label>
              Or <Link to="/signup">Register</Link>
            </label>
          </div>
          <div className="form-error-msg">{ this.props.message }</div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticating: state.authenticationReducer.isAuthenticating,
  message: state.authenticationReducer.message
});

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
