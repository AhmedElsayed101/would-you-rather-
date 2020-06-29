import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";


class Question extends Component {

    state = {
        submited : false
    }

    handleClick = () => {

        this.setState(() => ({
            submited : true
        }))
    }
    render () {

        const {authedUser,question, authorOfQuestion, isAnswered} = this.props
        const {submited} = this.state
        if (authedUser === null) {
            return <Redirect to = {'/'}/>
        }

        if (submited === true) {
            return <Redirect to = {{
				pathname: `/questions/${question.id}`,
				state: {
					isAnswered: isAnswered
				}
			}} />  
        }

        return (
            <div>
                <div>
                    question by {authorOfQuestion.name}
                </div>
                <div>option one: {question.optionOne.text}</div>
                <div>option two: {question.optionTwo.text}</div>
                
                <button onClick = {this.handleClick}>Show more</button>
            </div>
        )
    }
}


function mapStateToProps ({authedUser, questions, users}, props) {

    const {id,isAnswered } = props
    const question = questions[id]
    const authorID = question.author
    const authorOfQuestion = users[authorID]

    return {
        authedUser,
        question,
        authorOfQuestion,
        isAnswered
    }
}



export default connect(mapStateToProps)(Question)