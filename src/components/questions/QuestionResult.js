import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";



class QuestionResult extends Component {

    state = {
        clicked : false
    }

    handleClick = () => {
        this.setState(() => ({
            clicked : true
        }))
    }
    render () {

        const {authedUser,question, authorOfQuestion } = this.props
        const questionID = question.id
        const {clicked} = this.state
        if (authedUser === null) {
            return <Redirect to = {'/'}/>
        }

        if (clicked === true) {
            return <Redirect to = {`/home`}/>  
        }

        return (
            <div>
                <div>
                    question by {authorOfQuestion.name}
                </div>
                <div>option one {question.optionOne.text}</div>
                <div>option two {question.optionTwo.text}</div>
                <div>The answer is {authedUser.answers.questionID}</div>
                <button onClick = {this.handleClick}>Go home</button>
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

export default connect(mapStateToProps)(QuestionResult)