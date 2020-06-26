import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import {handleSaveQuestion} from '../../actions/questions'

class NewQuestion extends Component {

    state = {
        optionOne : '',
        optionTwo : '',
        submited : false
    }

    handleChangeOne = (e) => {

        const optionOne = e.target.value
        this.setState(() => ({
            optionOne
        }))
    }

    handleChangeTwo = (e) => {

        const optionTwo = e.target.value
        this.setState(() => ({
            optionTwo
        }))
    }

    handleSubmit = (e) => {

        e.preventDefault()

        const {optionOne, optionTwo } = this.state
        const {dispatch, authedUser}= this.props 
        console.log("1", optionOne)
        console.log("2", optionTwo)
        const question = {
            optionOneText : optionOne,
            optionTwoText : optionTwo,
            author : authedUser
        }
        dispatch(handleSaveQuestion(question))
        this.setState(() => ({
            optionOne : '',
            optionTwo : '',
            submited : true
        }))

    }
    render () {

        const {optionOne,optionTwo, submited} = this.state
        const {authedUser} = this.props

        if (authedUser === null) {
            return <Redirect to = {'/'}/>
        }
        if (submited === true) {
            return <Redirect to = {'/home'}/>
        }

        return (
            <div>
                <form onSubmit = {this.handleSubmit}>
                    <div> Would you Rather .. ? </div>
                    <input
                        type="text"
                        value = {optionOne}
                        onChange = {this.handleChangeOne}
                    />
                     
                    <input
                        type="text"
                        value = {optionTwo}
                        onChange = {this.handleChangeTwo}
                    />
                    <button >Submit</button>
                </form>

            </div>
        )
    }
}


function mapStateToProps ({authedUser}) {

    return {
        authedUser
    }
}




export default connect(mapStateToProps)(NewQuestion)