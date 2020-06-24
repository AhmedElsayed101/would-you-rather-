import  {_getUsers,
        _getQuestions,
        _saveQuestion,
        _saveQuestionAnswer,
        }       
from './_DATA'

export function getDataAPI () {
    return Promise.all ([
        _getUsers(),
        _getQuestions()
    ]).then(([users,questions]) => ({
        users,
        questions
    }))
}

export function saveQuestionAPI(question){
    return _saveQuestion(question)
}

export function saveAnswerAPI(answer){
    return _saveQuestionAnswer(answer)
}