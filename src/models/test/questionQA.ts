import { BaseQuestion } from './question'

export interface QuestionQA extends BaseQuestion {
    wordToGuess: string,
    isCorrect: boolean,
    videoUser?: string
}