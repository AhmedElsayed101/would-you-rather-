import { RECEIVE_QUESTIONS, SAVE_QUESTION, SAVE_ANSWER } from "../actions/questions";

export default function questions (state = {}, action){
    switch (action.type){
        case RECEIVE_QUESTIONS :
            return {
                ...state,
                ...action.questions
            }
        case SAVE_QUESTION :
            
            return {
				...state,
				[action.question.id]: action.question
            }
        case SAVE_ANSWER:
            return{
                ...state,
                [action.answer.qid]: {
                    ...state[action.answer.qid],
                    [action.answer.answer]: {
                        ...state[action.answer.qid][action.answer.answer],
                        votes : state[action.answer.qid][action.answer.answer].votes.concat([action.answer.authedUser])
                    }
                }
            }
        default :
            return state
    }
}

// const answer = {
//     authedUser,
//     qid : question.id,
//     answer : option
// }