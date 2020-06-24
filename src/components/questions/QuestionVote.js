import React, { Component } from "react";
import { connect } from "react-redux";

class QuestionVote extends Component {
    render () {
        return (
            <div>
                Question Vote
            </div>
        )
    }
}




export default connect()(QuestionVote)