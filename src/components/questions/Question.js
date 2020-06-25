import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";


class Question extends Component {
    render () {

        const {authedUser} = this.props

        if (authedUser === null) {
            return <Redirect to = {'/'}/>
        }
        return (
            <div>
                Question
            </div>
        )
    }
}


function mapStateToProps ({authedUser}) {

    return {
        authedUser
    }
}



export default connect(mapStateToProps)(Question)