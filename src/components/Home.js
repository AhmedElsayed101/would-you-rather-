import React, { Component } from "react";
import { connect } from "react-redux";

import {Redirect} from 'react-router-dom'

import Question from "./questions/Question";

class Home extends Component {
    render () {
        const {authedUser, questionsIds} = this.props

        // get the answered ids and unanswered ones
        const answeredQuestionsIds = []
        const notAnsweredQuestionsIds = []
        
        if (authedUser === null){
            return <Redirect to = {'/'}/>
        }
        
        return (
            <div>
                <h1>Questions</h1>
                <ul>
                    {
                        answeredQuestionsIds.map((id) => (
                            <li key = {id}> 
                                <Question id = {id}/>
                            </li>
                        ))
                    }
                </ul>
                <br/>
                <ul>
                    {
                        notAnsweredQuestionsIds.map((id) => (
                            <li key = {id}>
                                 <Question id = {id}/>
                            </li>
                        ))
                    }
                </ul>
              
            </div>
        )
    }
}


function mapStateToProps({ authedUser, questions, users }) {

    const questionsIds = Object.keys(questions)
    const authedUserData = users[authedUser] 

    return {
      authedUserData,
      questionsIds
    }
  }

export default connect(mapStateToProps)(Home)