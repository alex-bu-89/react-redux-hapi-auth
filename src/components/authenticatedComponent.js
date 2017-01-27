import React from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import Error from '../components/error';

/**
 * Make components protected
 * Rendeing component only if user authenticated
 * @param {React.component} Component
 */
export function requireAuthentication(Component) {
  class AuthenticatedComponent extends React.Component {
    render () {
      return (
        <div>
          {
            this.props.isAuthenticated === true
              ? <Component { ...this.props } />
              : <Error />
          }
        </div>
      )
    }
  }

  const mapStateToProps = (state) => ({
    access_token: state.authenticationReducer.access_token,
    userName: state.authenticationReducer.userName,
    isAuthenticated: state.authenticationReducer.isAuthenticated
  });

  return connect(mapStateToProps)(AuthenticatedComponent);
}
