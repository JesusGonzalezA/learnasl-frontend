import { Test } from "./test"

export interface TestInPersistence {
    state: 'loading' | 'error' | 'idle' | 'success',
    test: Test,
    page: number
}