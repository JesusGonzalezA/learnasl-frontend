import { BaseResponse } from './base'

interface RegisterData {
    guid: string
}

export interface RegisterResponse extends BaseResponse {
    data: RegisterData,
    errors: undefined
}