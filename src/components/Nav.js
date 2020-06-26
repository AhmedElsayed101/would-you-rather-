import React, {Component, useReducer} from 'react'
import { connect } from "react-redux";

import { NavLink, withRouter} from 'react-router-dom'

import { AiOutlineLogout } from 'react-icons/ai';

import {logout} from '../actions/authedUser'

class Nav extends  Component{

  logout = () => {
    const { dispatch } = this.props;

    dispatch(logout());
    this.props.history.push("/");
  }
  render() {

 
    return (
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to='/home' exact activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/new' activeClassName='active'>
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' activeClassName='active'>
              Leader Board
            </NavLink>
          </li>
          <li className='user-details'>
              <img src={this.props.avatarURL} className='nav-user-avatar'/>
              <span onClick={this.logout}><AiOutlineLogout size={30}/></span>
          </li>
        </ul>
      </nav>
    )
  }
} 


function mapStateToProps({ users, authedUser }) {
  console.log('users', users)
return {
  avatarURL: users[authedUser].avatarURL
}
}

export default withRouter(connect(mapStateToProps)(Nav))