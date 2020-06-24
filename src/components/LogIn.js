import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { setAuthedUser } from "../actions/authedUser";

class LogIn extends Component {

    state = {
        text : '',
        submited : false
    }
    handleChange = (e) => {

        const text = e.target.value
        this.setState(() => ({
            text
        }))
    }

    handleSubmit = (e) => {

        e.preventDefault()

        // check if name is right or not ? 
        const {text } = this.state
        const {dispatch}= this.props 
        dispatch(setAuthedUser(text))
        this.setState(() => ({
            text : '',
            submited : true
        }))
        

    }
    render () {

        const {text, submited} = this.state

        if (submited === true){
            return <Redirect to = {'/home'}/>

        }
    
        return (
            <div className = 'container'>
                <div> Welcome to Would you Rather  ..?</div>
                <form onSubmit = {this.handleSubmit} >
                    <input
                        type="text"
                        value = {text}
                        onChange = {this.handleChange}
                    />

                    <button>LogIn</button>
                </form> 
            </div>
        )
    }
}



function mapStateToProps ({authedUser}) {

    return {
        authedUser,
    }

}

export default connect(mapStateToProps)(LogIn)