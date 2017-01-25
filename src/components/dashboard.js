import React from 'react'

const RESULT_MESSAGE = "You're awesome!"

export default class Dashboard extends React.Component {
  render() {
    return (
      <h1>{ RESULT_MESSAGE }</h1>
    );
  }
}
