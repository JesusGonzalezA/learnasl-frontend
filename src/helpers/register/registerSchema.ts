import * as Yup from 'yup'
import { emailSchema } from '../common/emailSchema'
import { passwordSchema } from '../common/passwordSchema'

export const registerSchema = Yup.object().shape({
    email: emailSchema,
    password: passwordSchema,
    repeatPassword: Yup.string()
                            .oneOf(
                                [Yup.ref('password'), ''], 
                                'Passwords should match'
                            ).required('Repeat password is required')
})