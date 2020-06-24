import React, {Component, Fragment} from 'react';
import { connect } from "react-redux";

import { handleReceiveData } from "../actions/shared";


import  LoadingBar  from "react-redux-loading";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from './Nav';

import Home from "./Home"
import LeaderBoard from "./users/LeaderBoard"
import NewQuestion from "./questions/NewQuestion";
import Question from "./questions/Question";
import QuestionVote from "./questions/QuestionVote";
import QuestionResult from "./questions/QuestionResult";

class App extends Component {

  componentDidMount (){
    this.props.dispatch(handleReceiveData())
  }

  render() {

    return (
      <Router>
      
        <Fragment>
          <LoadingBar/>
          <div className = 'container'>
          <Nav/>
            { this.props.loading === true
            ? null
            : <div>
                <Route path = '/' exact component = {Home} />
                <Route path = '/question/:id' component = {Question}/>
                <Route path = '/question/:id/vote' component = {QuestionVote}/>
                <Route path = '/question/:id/result' component = {QuestionResult}/>
                <Route path = '/new' component = {NewQuestion}/>
                <Route path = '/leaderboard' component = {LeaderBoard}/>
              </div>
            }

          </div>

        </Fragment>
      </Router>
    );
  }
}



export default connect()(App)
