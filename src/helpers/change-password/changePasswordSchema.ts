import * as Yup from 'yup'
import { emailSchema } from '../common/emailSchema'
import { passwordSchema } from '../common/passwordSchema'

export const changePasswordSchema = Yup.object().shape({
    email: emailSchema,
    password: passwordSchema,
    repeatPassword: Yup.string()
                            .oneOf(
                                [Yup.ref('password'), null], 
                                'Passwords should match'
                            ).required('Repeat password is required')
})