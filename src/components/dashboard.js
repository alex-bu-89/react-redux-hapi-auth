import React from 'react'
import { connect } from 'react-redux';

const RESULT_MESSAGE = "You're awesome!"

/**
 * Dashboard component
 */
class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <h3>It is protected route</h3>
        <h1>Hi { this.props.userName }, { RESULT_MESSAGE }</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.authenticationReducer.userName,
});

export default connect(mapStateToProps)(Dashboard);
