import React, { Component } from "react";
import { connect } from "react-redux";

import { Redirect } from "react-router-dom";


class QuestionVote extends Component {
    render () {

        const {authedUser} = this.props

        if (authedUser === null) {
            return <Redirect to = {'/'}/>
        }
        return (
            <div>
                Question Vote
            </div>
        )
    }
}

function mapStateToProps ({authedUser}) {

    return {
        authedUser
    }
}

export default connect(mapStateToProps)(QuestionVote)