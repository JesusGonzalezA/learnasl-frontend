
export type ChangePasswordForm = {
    email: string
    password: string,
    repeatPassword: string
}

export type ChangePasswordParams = {
    email: string,
    token: string
}

export type ChangePassword = {
    email: string,
    password: string,
    token: string
}