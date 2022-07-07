import { Difficulty } from './difficulty'
import { TestType } from './testType'
import { BaseQuestion } from './question'

export type Test = {
    id: string,
    difficulty: Difficulty,
    testType: TestType,
    userId: string,
    questions: BaseQuestion[],
    createdOn: Date
}