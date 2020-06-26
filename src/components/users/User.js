import React, { Component } from "react";
import { connect } from "react-redux";

class User extends Component {
    render () {

        const {authedUser, user, index } = this.props
        
        return (
            <div key={user.id} className='leaderboard-row'>
                <div className='leaderboard-details'>
                    <div className='user-details'>
                        <img src={user.avatarURL} alt='User Avatar' className='user-avatar' />
                        <h3>{index + 1}. {user.name}</h3>
                    </div>
                    <div className='user-stat'>
                        <p><b>Questions Asked:</b> {user.questions.length}</p>
                    </div>
                    <div className='user-stat'>
                        <p><b>Questions Answered:</b> {Object.keys(user.answers).length}</p>
                    </div>
				</div>
			</div>
        )
    }
}


function mapStateToProps ({authedUser, users}, {id,index}) {
    const user = users[id]

    return {
        authedUser,
        user,
        index
    }
}


export default connect(mapStateToProps)(User)