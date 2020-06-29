import React, { Component } from "react";
import { connect } from "react-redux";

import {Redirect} from 'react-router-dom'

import Question from "./questions/Question";

class Home extends Component {

    state = {
        isAnswered : false
    }

    toggleAnswered = (e, isAnswered) => {

		e.preventDefault()

		this.setState(() => ({
            isAnswered
        }))
	}
    render () {
        const {authedUserData, questions, authedUser} = this.props
        const {isAnswered} =  this.state

        // get the answered ids and unanswered ones
        const answeredQuestionsIds = Object.keys(questions)
								        .filter((question) => (questions[question].optionOne.votes.indexOf(authedUser) > -1) || (questions[question].optionTwo.votes.indexOf(authedUser) > -1))
								        .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
		const notAnsweredQuestionsIds = Object.keys(questions)
								            .filter((question) => (questions[question].optionOne.votes.indexOf(authedUser) === -1) && (questions[question].optionTwo.votes.indexOf(authedUser) === -1))
								            .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
        
        if (authedUser === null){
            return <Redirect to = {{
				pathname: '/login',
				state: {
					returnPath: '/'
				}
			}}/>
        }
        
        return (
            <div>
                <h1>Questions</h1>
                {
					isAnswered === true
					? <h3 className='center'>Answered Questions</h3>
					: <h3 className='center'>Unanswered Questions</h3>
				}

                <div className='btn-list-group'>
					<button className='btn' onClick={(e) => this.toggleAnswered(e, false)}>Unanswered</button>
					<button className='btn' onClick={(e) => this.toggleAnswered(e, true)}>Answered</button>
				</div>
                <ul>
				{
					isAnswered 
					? answeredQuestionsIds.map((id) => (
					    <li key={id}><Question id={id} isAnswered = {isAnswered}/></li>
					))
					: notAnsweredQuestionsIds.map((id) => (
						<li key={id}><Question id={id} isAnswered = {isAnswered}/></li>
					))
				}
				</ul>
              
            </div>
        )
    }
}


function mapStateToProps({ authedUser, questions, users }) {

    // const questionsIds = Object.keys(questions)
    const authedUserData = users[authedUser] 

    return {
        authedUser,
        authedUserData,
        questions
    }
  }

export default connect(mapStateToProps)(Home)