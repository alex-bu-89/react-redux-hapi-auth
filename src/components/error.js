import React from 'react'
import { Link } from 'react-router'

export default class Error extends React.Component {
  render () {
    return (
      <div className="error-msg">
        <h1>This resource is protected</h1>
        <h4>please <Link to="/login">sign in</Link> first</h4>
      </div>
    )
  }
}
