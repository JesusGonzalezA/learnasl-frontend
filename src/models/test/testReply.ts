import { TestType } from './testType'

export type TestReply = {
    id: string,
    testType: TestType,
    userAnswer?: string,
    videoUser?: Blob
}