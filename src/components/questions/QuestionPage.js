import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";


class QuestionPage extends Component {

    state = {
        submited : false
    }

    handleClick = () => {

        this.setState(() => ({
            submited : true
        }))
    }
    render () {

        const {authedUser,question, authorOfQuestion } = this.props
        const {submited} = this.state
        if (authedUser === null) {
            return <Redirect to = {'/'}/>
        }

        if (submited === true) {
            return <Redirect to = {`/questions/${question.id}/vote`}/>  
        }

        return (
            <div>
                <div>
                    question by {authorOfQuestion.name}
                </div>
                <div>option one {question.optionOne.text}</div>
                <div>option two {question.optionTwo.text}</div>
                
                <button onClick = {this.handleClick}>Show more</button>
            </div>
        )
    }
}


function mapStateToProps ({authedUser, questions, users}, props) {

    const {id} = props.match.params
    const question = questions[id]
    const authorID = question.author
    const authorOfQuestion = users[authorID]

    return {
        authedUser,
        question,
        authorOfQuestion  
    }
}



export default connect(mapStateToProps)(QuestionPage)