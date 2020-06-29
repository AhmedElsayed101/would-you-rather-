import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { NoMatch } from "../App";
import { logout } from "../../actions/authedUser";

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

        const {authedUser,ID, question, dispatch,questions} = this.props
        if (authedUser === null) {
            return <Redirect to={{
                
				pathname: '/login',
				state: {
					returnPath: `/questions/${ID}`
				}
			}}/>
        }

        if(typeof question === 'undefined'){
            dispatch(logout)
            return <NoMatch/>
        }
        const { users } = this.props
        const {submited} = this.state
        const authorID = question.author
        const authorOfQuestion = users[authorID]

        const answeredQuestionsIds = Object.keys(questions)
								        .filter((question) => (questions[question].optionOne.votes.indexOf(authedUser) > -1) || (questions[question].optionTwo.votes.indexOf(authedUser) > -1))
								        .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
		const notAnsweredQuestionsIds = Object.keys(questions)
								            .filter((question) => (questions[question].optionOne.votes.indexOf(authedUser) === -1) && (questions[question].optionTwo.votes.indexOf(authedUser) === -1))
                                            .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
            
       
        const isAnsweredCheck = answeredQuestionsIds.includes(ID,0)

        if(isAnsweredCheck){
            console.log('qesf', question)
            const answer = users[authedUser].answers[ID]
            const optionOneVotes = question.optionOne.votes.length
            const optionTwoVotes = question.optionTwo.votes.length

            console.log('answer', answer)
            return(
                <div>
                    <div>
                        <img src={authorOfQuestion.avatarURL} className='nav-user-avatar'/> 
                        Question by: {authorOfQuestion.name}
                    </div>
                    <div>Option one: {question.optionOne.text}</div>
                    <div>Option two: {question.optionTwo.text}</div>
                    <div>The answer is: {answer}</div>
                    {answer === 'optionOne'
                        ?   <div>
                                <div>Number of votes : {optionOneVotes} </div>
                                <div>Percentage : {optionOneVotes/(optionTwoVotes+optionOneVotes)*100}%</div>
                        </div>

                        :   <div>
                                 <div>Number of votes : {optionTwoVotes} </div>
                                <div>Percentage : {optionTwoVotes/(optionOneVotes+optionTwoVotes)*100}%</div>
                        </div>
                            
                    }

                </div>)
        }

        if (submited === true) {
            return <Redirect to = {`/questions/${question.id}/vote`}/>  
        }

        return (
            <div>
             
                <div>
                    <img src={authorOfQuestion.avatarURL} className='nav-user-avatar'/> 
                    Question by: {authorOfQuestion.name}
                </div>
                <div>Option one: {question.optionOne.text}</div>
                <div>Option two: {question.optionTwo.text}</div>
                
                <button onClick = {this.handleClick}>Vote</button>
            </div>
        )
    }
}


function mapStateToProps ({authedUser, questions, users}, props) {

    const {id} = props.match.params
    console.log('id', id)

    const question = questions[id]
    console.log('question', question)

    return {
        ID : id,
        authedUser,
        question,
        questions,
        users,
    }
}



export default connect(mapStateToProps)(QuestionPage)