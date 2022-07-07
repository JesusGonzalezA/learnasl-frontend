import { Formik, Form } from 'formik'
import { Link } from 'react-router-dom'
import { Avatar, Box, Container, Grid, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { Login } from '../../models/auth'
import { FormikField } from '../../components/formik'
import { Dialog } from '../../components/dialog/Dialog'
import { loginSchema, initialValues } from '../../helpers/login'
import { ResetPasswordForm } from '../../components/reset-password/ResetPasswordForm'
import * as AuthActions from '../../redux/auth/actions'

export const LoginScreen = () => {
    const dispatch = useAppDispatch()
    const { status }= useAppSelector(state => state.auth)
    
    const handleSubmit = (values: Login) : void => {
        dispatch(AuthActions.loginAsync(values))
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
                    Sign in
                </Typography>

                <Box sx={{ 
                    mt: 1, 
                    maxWidth: 0.7,
                    width: 400
                }}>
                    <Formik 
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={loginSchema}
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

                                <LoadingButton
                                    disabled={!dirty || !isValid}
                                    type='submit'
                                    fullWidth
                                    variant='contained'
                                    loading={status === 'loading'}
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Login
                                </LoadingButton>
                                
                            </Form> 
                        )}
                    </Formik>

                    <Grid container>
                        <Grid item xs>
                            <Link to='/auth/register'>Sign up</Link>
                        </Grid>
                        <Grid item>
                            <Dialog
                                messageButton='Reset password'
                                title='Reset password'
                                content='Enter your email to remember the password' 
                                component={
                                    <ResetPasswordForm />
                                }
                            /> 
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}
