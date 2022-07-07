import { Difficulty } from '../test/difficulty'

export type SuccessRateQueryFilter = {
    year: number,
    month?: number,
    day?: number,
    difficulty?: Difficulty
}