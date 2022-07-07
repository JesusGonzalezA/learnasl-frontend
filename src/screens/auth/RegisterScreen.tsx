import { Link } from 'react-router-dom'
import { Formik, Form } from 'formik'
import { Avatar, Box, Container, Grid, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import * as AuthActions from '../../redux/auth/actions'
import { Register } from '../../models/auth'
import { FormikField } from '../../components/formik'
import { initialValues, registerSchema } from '../../helpers/register'
import { Dialog } from '../../components/dialog/Dialog'
import { ResendConfirmationEmailForm } from '../../components/resend-confirmation-email/ResendConfirmationEmailForm'

export const RegisterScreen = () => {
    const dispatch = useAppDispatch()
    const { status } = useAppSelector(state => state.auth)
    
    const handleSubmit = (values: Register) : void => {
        dispatch(AuthActions.registerAsync(values))
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
                    Sign up
                </Typography>

                <Box sx={{ 
                    mt: 1, 
                    maxWidth: 0.7,
                    width: 400
                }}>
                    <Formik 
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={registerSchema}
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

                                <LoadingButton
                                    disabled={!dirty || !isValid}
                                    type='submit'
                                    fullWidth
                                    variant='contained'
                                    loading={status === 'loading'}
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign up
                                </LoadingButton>
                            </Form> 
                        )}
                    </Formik>

                    <Grid container>
                        <Grid item xs>
                            <Link to='/auth/login'>Sign in</Link>
                        </Grid>
                        <Grid item>
                            <Dialog
                                messageButton='Resend confirmation email'
                                title='Resend confirmation email'
                                content='Enter the email to resend the confirmation email' 
                                component={
                                    <ResendConfirmationEmailForm />
                                }
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}
