import React from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import { App } from './app';
import routes from '../routes/';
import { connect } from 'react-redux';

/**
 * Root component
 */
export default class Root extends React.Component {

  static propTypes = {
    store: React.PropTypes.object.isRequired
  };

  render() {
    return (
      <Provider store={ this.props.store }>
        <ReduxRouter>
          { routes }
        </ReduxRouter>
      </Provider>
    );
  }
}
