import React, { Component } from 'react';
import { Link } from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
require("./login.sass");

class Signup extends Component {

  handleClick(event) {
    event.preventDefault();
    // TODO check validity
    this.props.actions.signUpAndLogin(this.refs.name.value, this.refs.email.value, this.refs.password.value, '/dashboard');
  }

  render() {
    return (
      <div className="container">
        <form className="form-signup">
          <h2 className="form-signin-heading">Please register</h2>
          <input ref="email" type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus />
          <input ref="name" type="input" id="inputName" className="form-control" placeholder="Name" required />
          <input ref="password" type="password" id="inputPassword" className="form-control" placeholder="Password" required />
          <button onClick={this.handleClick.bind(this)} className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
          <div className="bottom-link">
            <label>
              Or <Link to="/login">login</Link>
            </label>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
