import React, { Component } from "react";
import { connect } from "react-redux";

import { Redirect } from "react-router-dom";

import { handleSaveAnswer } from "../../actions/questions";

class QuestionVote extends Component {

    state = {

        option : '',
        submited : false,

    }

    handleChange = (e) => {
        const {name, value, checked,} =  e.target
        this.setState(()=>({
            [name] : value
        }))

    }
    
    handleVote = (e) => {

        e.preventDefault()
        const {option} = this.state
        const {dispatch, authedUser, question} = this.props
        const answer = {
            authedUser,
            qid : question.id,
            answer : option
        }
        dispatch(handleSaveAnswer(answer))
        this.setState(() => ({
            submited : true,
        }))
        
    }
    render () {

        const {authedUser,question, authorOfQuestion } = this.props
        const {option,submited} = this.state
        if (authedUser === null) {
            return <Redirect to = {'/'}/>
        }

        if (submited === true) {
            return <Redirect to = {`/questions/${question.id}/result`}/>  
        }

        return (
            <div>
                <div>
                    question by {authorOfQuestion.name}
                </div>
                <form action="">
                    <input
                        id = "one"
                        type="radio"
                        name="option"
                        value="optionOne"
                        checked = {option === 'optionOne'}
                        onChange = {this.handleChange}
                    />
                    <label for="one">{question.optionOne.text}</label>
                    <br/>
                    <input
                        id = "two"
                        type="radio" 
                        name="option" 
                        value="optionTwo"
                        checked = {option === 'optionTwo'}
                        onChange = {this.handleChange}

                    />
                    <label for="two">{question.optionTwo.text}</label>
                    <br/>
                    <button>Vote</button>
                </form>
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

export default connect(mapStateToProps)(QuestionVote)