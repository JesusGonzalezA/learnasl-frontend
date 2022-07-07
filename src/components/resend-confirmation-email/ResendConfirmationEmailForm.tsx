import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { FormikField } from '../formik'
import { emailSchema } from '../../helpers/common/emailSchema'
import { useAppDispatch } from '../../redux/hooks'
import { Button, DialogActions } from '@mui/material'
import * as AuthActions from '../../redux/auth/actions'

interface sendConfirmationEmailForm {
    email: string
}

const initialValues: sendConfirmationEmailForm = {
    email: ''
}

export const resendConfirmationEmailSchema = Yup.object().shape({
    email: emailSchema
})

export const ResendConfirmationEmailForm = () => {
    const dispatch = useAppDispatch()

    const resendConfirmation = (values: sendConfirmationEmailForm) => {
        dispatch(AuthActions.resendConfirmationEmailAsync(values.email))
    }

    return (
        <Formik 
            initialValues={initialValues}
            onSubmit={resendConfirmation}
            validationSchema={resendConfirmationEmailSchema}
            validateOnChange
        >
            {({errors, touched, isValid, dirty}) => (
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
                        <Button type='submit' disabled={ !dirty || !isValid }>Resend confirmation</Button>
                    </DialogActions>
                </Form>
            )}
        </Formik>
    )
}