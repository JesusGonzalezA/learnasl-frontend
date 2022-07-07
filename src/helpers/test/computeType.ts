import {
    QuestionOptionVideoToWord, 
    QuestionOptionWordToVideo
} from '../../models/test'
import { answerToLabel } from './answerToLabel'
import { AnswerType } from './AnswerType'

export const computeTypeOptionWordToVideo = (label : string, editable : boolean, question : QuestionOptionWordToVideo, questions : string[]) => {
    if (editable) {
        return AnswerType.DEFAULT
    }

    const answerLabel = answerToLabel(questions, question.correctAnswer)
    const userLabel   = question.userAnswer

    if (label === answerLabel){
        return AnswerType.SUCCESS
    }
    
    return (label === userLabel) ? AnswerType.ERROR : AnswerType.DEFAULT
}

export const computeTypeOptionVideoToWord = (label : string, editable : boolean, question : QuestionOptionVideoToWord, questions : string[]) => {
    if (editable) {
        return AnswerType.DEFAULT
    }

    const answerLabel = question.correctAnswer
    const userLabel = question.userAnswer

    if (label === answerLabel){
        return AnswerType.SUCCESS
    }

    return (label === userLabel) ? AnswerType.ERROR : AnswerType.DEFAULT
}