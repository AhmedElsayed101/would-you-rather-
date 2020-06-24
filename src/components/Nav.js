import React, {Component, useReducer} from 'react'
import { connect } from "react-redux";

import { NavLink } from 'react-router-dom'

import { AiOutlineLogout } from 'react-icons/ai';


class Nav extends  Component{

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
              <span onClick={this.logoutUser}><AiOutlineLogout size={30}/></span>
          </li>
        </ul>
      </nav>
    )
  }
} 

// function mapStateToProps({authedUser, users}){
//   console.log('users', users)
//   console.log('authed', authedUser)
//   return {
//     avatarURL: users[authedUser].avatarURL
//   }

// }

function mapStateToProps({ users, authedUser }) {
  console.log('users', users)
return {
  avatarURL: users[authedUser].avatarURL
}
}

export default connect(mapStateToProps)(Nav)