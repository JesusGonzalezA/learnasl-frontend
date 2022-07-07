import { forwardRef } from 'react'
import MuiAlert, { AlertProps as MuiAlertProps } from '@mui/material/Alert'
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar'
import { useAppDispatch } from '../../redux/hooks'
import { clearError, clearInfoMessage, clearSuccessMessage } from '../../redux/auth/authSlice'

interface AlertProps {
  message: string,
  position?: SnackbarOrigin,
  type: 'info' | 'success' | 'error',
  onClose: Function
}

const MuiAlertRef = forwardRef<
  HTMLDivElement, 
  MuiAlertProps>((props, ref) => (
    <MuiAlert 
      elevation={6} 
      ref={ref} 
      variant='filled'
      {...props}
    />
  )
)

export const Alert = ({type, message, position, onClose}: AlertProps) => {
  const dispatch = useAppDispatch()

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    onClose()

    let fn: Function = () => {}

    if (type === 'error')
      fn = clearError
    else if (type === 'info')
      fn = clearInfoMessage
    else if (type === 'success')
      fn = clearSuccessMessage
    
    dispatch(fn(message))
  }

  return (
    <Snackbar open autoHideDuration={6000} onClose={handleClose} anchorOrigin={position}>
        <MuiAlertRef onClose={handleClose} severity={type} sx={{ width: '100%' }}>
            {message}
        </MuiAlertRef>
    </Snackbar>
  )
} 
