import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { FormikField } from '../formik'
import { emailSchema } from '../../helpers/common/emailSchema'
import { useAppDispatch } from '../../redux/hooks'
import DialogActions from '@mui/material/DialogActions'
import { Button } from '@mui/material'
import * as AuthActions from '../../redux/auth/actions'

interface resetPasswordForm {
    email: string
}
const initialValues: resetPasswordForm = {
    email: ''
}

export const resetPasswordSchema = Yup.object().shape({
    email: emailSchema
})

export const ResetPasswordForm = () => {
    const dispatch = useAppDispatch()

    const handleForgetPassword = (values: resetPasswordForm) => {
        dispatch(AuthActions.startChangePasswordAsync(values.email))
    }

    return (
        <Formik 
            initialValues={initialValues}
            onSubmit={handleForgetPassword}
            validationSchema={resetPasswordSchema}
            validateOnChange
        >
            {({errors, touched, isValid, dirty, values}) => (
                <Form>
                    <div>
                        <FormikField
                            name='email'
                            type='input' 
                            label='Email' 
                            variant='standard' 
                            errorText={errors.email} 
                            touched={touched.email}
                            required
                        />
                    </div>

                    <DialogActions>
                        <Button type='submit' disabled={ !dirty || !isValid }>Reset password</Button>
                    </DialogActions>
                </Form>
            )}
        </Formik>
    )
}