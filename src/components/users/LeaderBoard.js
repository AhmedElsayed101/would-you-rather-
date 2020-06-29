import React, { Component } from "react";
import { connect } from "react-redux";
import User from './User'
import { Redirect } from "react-router-dom";

class LeaderBoard extends Component {
    render () {

        const {authedUser, users} = this.props

        if (authedUser === null) {
            return <Redirect to = {{
				pathname: '/login',
				state: {
					returnPath: '/leaderboard'
				}
			}}/>
        }

        return (
            
            <div className='leaderboard'>
				<h3 className='center'>Leaderboard</h3>
				{
					this.props.users.map((user, index) => (
                        <User key = {user.id} id = {user.id} index = {index}/>    
					))
				}
			</div>
        )
    }
}

function mapStateToProps({authedUser, users}) {

    return {
        users: Object.keys(users).sort((a,b) => (users[b].questions.length + Object.keys(users[b].answers).length) - (users[a].questions.length + Object.keys(users[a].answers).length)).map((user) => users[user]),
        authedUser
    }
}


export default connect(mapStateToProps)(LeaderBoard)