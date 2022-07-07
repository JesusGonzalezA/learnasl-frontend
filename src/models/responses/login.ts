import { BaseResponse } from './base'

interface LoginData {
    email: string,
    token: string,
    id: string
}

export interface LoginResponse extends BaseResponse {
    data: LoginData,
    errors: undefined
}