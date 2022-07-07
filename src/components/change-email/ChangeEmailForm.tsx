import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { FormikField } from '../formik'
import { emailSchema } from '../../helpers/common/emailSchema'
import { useAppDispatch } from '../../redux/hooks'
import DialogActions from '@mui/material/DialogActions'
import EmailIcon from '@mui/icons-material/Email'
import { Box, Button } from '@mui/material'
import { thunkChangeEmail } from '../../redux/auth/authSlice'

interface changeEmailForm {
    email: string,
    repeatedEmail: string
}
const initialValues: changeEmailForm = {
    email: '',
    repeatedEmail: ''
}

export const changeEmailSchema = Yup.object().shape({
    email: emailSchema,
    repeatedEmail: Yup.string()
                            .oneOf(
                                [Yup.ref('email'), ''], 
                                'Emails should match'
                            ).required('Repeated email is required')
})

export const ChangeEmailForm = () => {
    const dispatch = useAppDispatch()
    
    const handleChangeEmail = (values: changeEmailForm) => {
        dispatch(thunkChangeEmail(values.email))
    }

    return (
        <Formik 
            initialValues={initialValues}
            onSubmit={handleChangeEmail}
            validationSchema={changeEmailSchema}
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

                    <Box sx={{ marginTop: 1 }}>
                        <FormikField
                            name='repeatedEmail'
                            type='input' 
                            label='Repeat the email' 
                            variant='standard' 
                            errorText={errors.repeatedEmail} 
                            touched={touched.repeatedEmail}
                            required
                        />
                    </Box>

                    <DialogActions>
                        <Button 
                            startIcon={<EmailIcon />}
                            type='submit' disabled={ !dirty || !isValid }
                        >
                            Change email
                        </Button>
                    </DialogActions>
                </Form>
            )}
        </Formik>
    )
}