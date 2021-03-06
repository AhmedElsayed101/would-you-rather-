import React, {Component, Fragment} from 'react';
import { connect } from "react-redux";

import { handleReceiveData } from "../actions/shared";


import  LoadingBar  from "react-redux-loading";

import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Nav from './Nav';

import Home from "./Home"
import LogIn from "./LogIn";
import LeaderBoard from "./users/LeaderBoard"
import NewQuestion from "./questions/NewQuestion";
import QuestionPage from "./questions/QuestionPage";
import QuestionVote from "./questions/QuestionVote";
import QuestionResult from "./questions/QuestionResult";

export function NoMatch (){
  return(
    <div>Not Found! ...</div>
  )
}

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
            {
              !this.props.showLogin &&
              <Nav />
            }
            { this.props.loading === true
            ? null
            : <div>
                <Switch>
                  <Route path = '/login' exact component = {LogIn}/>
                  <Route path = '/' exact component = {Home} />
                  <Route path = '/questions/:id' exact component = {QuestionPage}/>
                  <Route path = '/questions/:id/vote' component = {QuestionVote}/>
                  <Route path = '/questions/:id/result' component = {QuestionResult}/>
                  <Route path = '/new' component = {NewQuestion}/>
                  <Route path = '/leaderboard' component = {LeaderBoard}/>
                  <Route component = {NoMatch}/>
                </Switch>
              </div>
            }

          </div>

        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {

  return {
    showLogin: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
