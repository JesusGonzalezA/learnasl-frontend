import { SnackbarOrigin } from '@mui/material/Snackbar'
import { useAppDispatch } from '../../redux/hooks'
import { clearError, clearInfoMessage, clearSuccessMessage } from '../../redux/dashboard/dashboardSlice'
import { Alert } from './Alert'

interface AlertProps {
  message: string,
  position?: SnackbarOrigin,
  type: 'info' | 'success' | 'error'
}

export const DashboardAlert = ({type, message, position}: AlertProps) => {
  const dispatch = useAppDispatch()

  const onClose = () => {
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
    <Alert 
        message={message}
        type={type}
        position={position}
        onClose={onClose}
    />
  )
} 
