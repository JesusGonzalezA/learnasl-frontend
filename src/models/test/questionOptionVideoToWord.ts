import { BaseQuestion } from './question'

export interface QuestionOptionVideoToWord extends BaseQuestion {
    videoToGuess: string,
    possibleAnswer0: string,
    possibleAnswer1: string,
    possibleAnswer2: string,
    possibleAnswer3: string,
    userAnswer?: string,
    correctAnswer: string
}