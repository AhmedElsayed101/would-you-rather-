import {getDataAPI} from '../utils/api'

import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";
import { setAuthedUser } from "./authedUser";

import { showLoading, hideLoading } from "react-redux-loading";

const AUTHED_ID = 'tylermcginnis'

export function handleReceiveData () {
    return (dispatch) => {

        dispatch(showLoading())

        return getDataAPI()
            .then(({users, questions}) => {

                dispatch(receiveUsers)
                dispatch(receiveQuestions(tweets))
                dispatch(setAuthedUser(AUTHED_ID))
                dispatch(hideLoading())
            })
    }
}