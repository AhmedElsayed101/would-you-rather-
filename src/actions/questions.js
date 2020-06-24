import {saveQuestionAPI} from '../utils/api'
import { showLoading, hideLoading } from "react-redux-loading";

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SAVE_QUESTION = 'SAVE_QUESTION'





export function receiveQuestions (questions) {
    return {
        type : RECEIVE_QUESTIONS,
        questions
    }
}

function saveQuestion (question) {
    return {
        type : SAVE_QUESTION,
        question
    }
}

export function handleSaveQuestion (question) {
    return (dispatch) => {
        dispatch(showLoading())

        return saveQuestionAPI(question)
            .then((question) =>{
                dispatch(saveQuestion(question))
                dispatch(hideLoading())
            })

        
    }
}
