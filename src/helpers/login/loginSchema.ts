import * as Yup from 'yup'
import { emailSchema } from '../common/emailSchema'
import { passwordSchema } from '../common/passwordSchema'

export const loginSchema = Yup.object().shape({
    email: emailSchema,
    password: passwordSchema
})