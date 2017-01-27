import React from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

/**
 * Navigation component
 */
class Navigation extends React.Component {

  /**
   * Handle click
   */
  handleClick(event) {
    event.preventDefault();
    this.props.actions.logoutAndRedirect();
  }

  render () {
    return (
      <nav className="navigation-bar navbar navbar-light bg-faded">
        {
          this.props.isAuthenticated
            ? <span className="navbar-brand navbar-left">Welcome { this.props.userName }</span>
            : <span className="navbar-brand navbar-left">Welcome guest</span>
        }
        <ul className="navigation nav navbar-nav navbar-right">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">Protected</Link>
          </li>
          <li className="nav-item">
                { this.props.isAuthenticated ?
                  <Link onClick={this.handleClick.bind(this)} className="nav-link" to="/login">Sign out</Link> :
                  null
                }
                { !this.props.isAuthenticated ?
                  <Link className="nav-link" to="/login">Login</Link> :
                  null
                }
          </li>
          {
            this.props.isAuthenticated
              ? null
              : <li className="nav-item"><Link className="nav-link" to="/signup">Register</Link></li>
          }
        </ul>
      </nav>
    )
  }
}

const mapStateToProps = (state) => (
  {
    isAuthenticated: state.authenticationReducer.isAuthenticated,
    userName: state.authenticationReducer.userName,
    message: state.authenticationReducer.message
  });

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
