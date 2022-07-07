import { TestType, Difficulty } from '../test'

export type TestQueryFilter = {
    userId: string,
    pageSize: number,
    pageNumber: number,
    testType?: TestType,
    difficulty?: Difficulty,
    fromDate?: string,
    toDate?: string
}