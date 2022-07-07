import { useAppDispatch } from '../../redux/hooks'
import DialogActions from '@mui/material/DialogActions'
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material'
import { thunkDeleteMyAccount } from '../../redux/auth/authSlice'

export const DeleteMyAccountForm = () => {
    const dispatch = useAppDispatch()
    
    const handleDeleteMyAccount = () => {
        dispatch(thunkDeleteMyAccount())
    }

    return (
        <DialogActions>
            <Button 
                onClick={handleDeleteMyAccount}
                startIcon={<DeleteIcon />}
                color='error'
            >
                Delete my account
            </Button>
        </DialogActions>
    )
}