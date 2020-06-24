import React, { Component } from "react";
import { connect } from "react-redux";

class QuestionResult extends Component {
    render () {
        return (
            <div>
                Question Result
            </div>
        )
    }
}




export default connect()(QuestionResult)