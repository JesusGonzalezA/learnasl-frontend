import { Difficulty } from '../../models/test/difficulty'

export const difficultyToColor = (difficulty: Difficulty) => {
    switch(difficulty as Difficulty)
    {
        case Difficulty.EASY:
            return 'success'
        case Difficulty.MEDIUM:
            return 'warning'
        case Difficulty.HARD:
            return 'error'
        default:
            return undefined
    }
}

export const difficultyToString = (difficulty: Difficulty) => {
    switch(difficulty as Difficulty)
    {
        case Difficulty.EASY:
            return 'Easy'
        case Difficulty.MEDIUM:
            return 'Medium'
        case Difficulty.HARD:
            return 'Hard'
        default:
            return 'Not found'
    }
}