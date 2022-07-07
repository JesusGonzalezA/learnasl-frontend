import { BaseQuestion } from './question'

export interface QuestionMimic extends BaseQuestion {
    wordToGuess: string,
    videoHelp: string,
    videoUser: string,
    isCorrect: boolean
}