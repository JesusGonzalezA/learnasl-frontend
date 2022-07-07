import { Test } from '../test'
import { BaseResponse } from './base'

export interface TestResponse extends BaseResponse {
    data: Test,
    errors: undefined
}