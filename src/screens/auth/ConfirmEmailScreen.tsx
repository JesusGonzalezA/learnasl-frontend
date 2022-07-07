import { Navigate, useParams } from 'react-router-dom'
import { CircularProgress, Grid } from '@mui/material'

import * as AuthActions from '../../redux/auth/actions'
import { ConfirmEmail } from '../../models/auth'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { useEffect } from 'react'

export const ConfirmEmailScreen = () => {
    const dispatch = useAppDispatch()
    const params = useParams<ConfirmEmail>()
    const { status } = useAppSelector(state => state.auth)

    useEffect(() => {
        dispatch(AuthActions.confirmEmailAsync({
            email: params.email ?? '',
            token: params.token ?? ''
        }))
    }, [dispatch, params])

    if (status === 'loading')
        return (
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100vh' }}
            >
                <CircularProgress />
            </Grid> 
        )
    else 
        return (
            <Navigate to="/auth/login" replace />
        )
}
