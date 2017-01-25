import React from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import { App } from './app';
import routes from '../routes/';
import { connect } from 'react-redux';

export default class Root extends React.Component {

  static propTypes = {
    store: React.PropTypes.object.isRequired
  };

  render() {

    console.log('App init');
    console.log(this.props.store.getState());

    return (
      <Provider store={ this.props.store }>
        <ReduxRouter>
          { routes }
        </ReduxRouter>
      </Provider>
    );
  }
}
