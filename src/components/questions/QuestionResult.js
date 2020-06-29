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

        const {authedUser,question, users, ID } = this.props
       
        const {clicked} = this.state
        if (authedUser === null) {
            return <Redirect to = {{
                
				pathname: '/login',
				state: {
					returnPath: `/questions/${ID}/result`
				}
			}}/>
        }

        const questionID = question.id
        const authorID = question.author
        const authorOfQuestion = users[authorID]
        const authedUserData = users[authedUser]


        if (clicked === true) {
            return <Redirect to = {`/`}/>  
        }

        return (
            <div>
                <div>
                    <img src={authorOfQuestion.avatarURL} className='nav-user-avatar'/> 
                    question by {authorOfQuestion.name}
                </div>
                <div>option one: {question.optionOne.text}</div>
                <div>option two: {question.optionTwo.text}</div>
                <div>The answer is: {authedUserData.answers[questionID]}</div>
                <button onClick = {this.handleClick}>Go home</button>
            </div>
        )
    }
}

function mapStateToProps ({authedUser, questions, users}, props) {

    const {id} = props.match.params
    console.log('id', id)
    const question = questions[id]
   
  

    return {
        authedUser,
        question,
        users,
        ID :id
    }
}

export default connect(mapStateToProps)(QuestionResult)