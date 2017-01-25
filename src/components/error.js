import React from 'react'
import { Link } from 'react-router'

export default class Error extends React.Component {
  render () {
    return (
      <p>This resource is protected please <Link to="/login">sign in</Link> first</p>
    )
  }
}
