import { useCallback, useEffect, useState } from 'react'
import { Box, Container, Divider, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import DeleteIcon from '@mui/icons-material/Delete'
import { LoadingButton } from '@mui/lab'
import * as TestApi from '../../api/test'
import { setErrors, setInfoMessages } from '../../redux/dashboard/dashboardSlice'
import { Dialog } from '../../components/dialog/Dialog'
import { ChangeEmailForm } from '../../components/change-email/ChangeEmailForm'
import { DeleteMyAccountForm } from '../../components/delete-my-account/DeleteMyAccountForm'

export const ProfileScreen = () => {
  const { user } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  const [loadingDeleteTests, setLoadingDeleteTests] = useState<boolean>(false)
  const [abortController, ] = useState(new AbortController())

  useEffect(() => {
    return (() => {
      abortController.abort()
    })
  }, [abortController])

  const deleteTestsCallback = useCallback(async (abortController : AbortController) => {
    return await TestApi.deleteAllTests(abortController)
  }, [])

  const handleDeleteTests = () => {
    const deleteTests = async () => {
      setLoadingDeleteTests(true)
      deleteTestsCallback(abortController)
        .then( async (result) => {
          if (!result.ok)
          {
            const error = (result.status === 401) 
              ? 'Your session has expired. Login again.'
              : 'Something went wrong'
            throw Error(error)
          }

          dispatch(setInfoMessages(['The tests have been deleted']))
        })
        .catch( (error) => {
          if (abortController.signal.aborted) return
          dispatch(setErrors([error]))
        })
        .finally( () => {
          setLoadingDeleteTests(false)
        })
    }

    deleteTests()
  }

  return (
    <Container component='main' sx={{marginBottom: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant='h3' component='h1' sx={{ marginBottom: 3 }}>My profile</Typography>

        <Divider sx={{ width: '80%', marginBottom: 3 }} />

        <Typography>Email: { user.email }</Typography>
        
        <Box sx={{ minWidth: 340, maxWidth: 400, marginTop: 3 }}>
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <LoadingButton 
              onClick={handleDeleteTests}
              loading={loadingDeleteTests} 
              size="small" sx={{ maxWidth: '45%' }} variant="outlined" 
              startIcon={<DeleteIcon />} color="error"
            >
              Delete all my tests
            </LoadingButton>

            <Dialog
                messageButton='Change email'
                title='Change email'
                content='Enter a new email. Take into account that you will have to confirm your email again and login. If the email introduced is incorrect, you should call support.' 
                component={
                    <ChangeEmailForm />
                }
            />
          </Box>
        </Box>
        
        <Box sx={{ marginTop: 3 }}>
          <Dialog
            color='error'
            messageButton='Delete my account'
            title='Delete my account'
            content='Are you sure? You will not be able to recover your data again' 
            component={
              <DeleteMyAccountForm />
            }
          />
        </Box>

      </Box>
    </Container>
  )
}
