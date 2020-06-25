import React, { Component } from "react";
import { connect } from "react-redux";

import {Redirect} from 'react-router-dom'

class Home extends Component {
    render () {
        const {authedUser} = this.props
        if (authedUser === null){
            return <Redirect to = {'/'}/>
        }
        
        return (
            <div>
                Home
            </div>
        )
    }
}


function mapStateToProps({ authedUser }) {
    return {
      authedUser
    }
  }

export default connect(mapStateToProps)(Home)