import { BaseResponse } from './base'

export interface ErrorResponse extends BaseResponse {
    data: undefined,
    errors: string[]
}