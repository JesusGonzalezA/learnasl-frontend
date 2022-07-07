import { Formik, Form } from 'formik'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Avatar, Box, Button, Container, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'


import * as AuthActions from '../../redux/auth/actions'
import { useAppDispatch } from '../../redux/hooks'
import { ChangePassword, ChangePasswordForm, ChangePasswordParams } from '../../models/auth'
import { initialValues, changePasswordSchema } from '../../helpers/change-password'
import { FormikField } from '../../components/formik'

export const ChangePasswordScreen = () => {
    const dispatch = useAppDispatch()
    const { email, token } = useParams<ChangePasswordParams>()
    initialValues.email = email ?? ''

    const handleSubmit = (values: ChangePasswordForm) => {
        dispatch(AuthActions.changePasswordAsync({
            email: values.email,
            password: values.password,
            token
        } as ChangePassword))
    }

    return (
        <Container component='main'>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography component='h1' variant='h5'>
                    Change password
                </Typography>

                <Box sx={{ 
                    mt: 1, 
                    maxWidth: 0.7,
                    width: 400
                }}>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={changePasswordSchema}
                        validateOnMount
                    >
                        {({isValid, dirty, errors, touched}) => (
                            <Form>
                                <div>
                                    <FormikField 
                                        name='email'
                                        type='input' 
                                        label='Email'
                                        errorText={errors.email} 
                                        touched={touched.email}
                                        margin='normal'
                                        fullWidth
                                        required
                                    />
                                </div>

                                <div>
                                    <FormikField 
                                        name='password' 
                                        type='password'
                                        label='Password'
                                        errorText={errors.password}
                                        touched={touched.password}
                                        margin='normal'
                                        fullWidth
                                        required 
                                    />
                                </div>

                                <div>
                                    <FormikField 
                                        name='repeatPassword' 
                                        type='password'
                                        label='Repeat the password'
                                        errorText={errors.repeatPassword}
                                        touched={touched.repeatPassword}
                                        margin='normal'
                                        fullWidth
                                        required 
                                    />
                                </div>

                                <Button
                                    disabled={!dirty || !isValid}
                                    type='submit'
                                    fullWidth
                                    variant='contained'
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Change password
                                </Button>
                            </Form> 
                        )}
                    </Formik>

                    <div>
                    <Link to='/auth/login'>Sign in</Link>
                    </div>
                </Box>
            </Box>
        </Container>
    )
}
