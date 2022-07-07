import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthAlert } from '../components/alert'
import { useAppSelector } from '../redux/hooks'
import { 
    ConfirmEmailScreen, 
    LoginScreen, 
    ChangePasswordScreen, 
    RegisterScreen 
} from '../screens'

export const AuthRoutes = () => {

    const { errors, messages } = useAppSelector(state => state.auth)

    return (
        <>
            <Routes>
                <Route path="login" element={<LoginScreen />} />
                <Route path="register" element={<RegisterScreen />} />
                <Route path="email-confirmation/:email/:token" element={<ConfirmEmailScreen />} />
                <Route path="password-recovery/:email/:token" element={<ChangePasswordScreen />} />

                <Route path="*" element={<Navigate to="login" />} />
            </Routes>

            {
                errors.map((error, index) => (
                    <AuthAlert 
                        key={index}
                        message={error}
                        type='error'
                        position={{horizontal: 'center', vertical: 'bottom'}}
                    /> 
                ))
            }

            {
                messages.info.map((info, index) => (
                    <AuthAlert 
                        key={index}
                        message={info}
                        type={'info'}
                        position={{horizontal: 'center', vertical: 'bottom'}}
                    /> 
                ))
            }

            {
                messages.success.map((suc, index) => (
                    <AuthAlert 
                        key={index}
                        message={suc}
                        type={'success'}
                        position={{horizontal: 'center', vertical: 'bottom'}}
                    /> 
                ))
            }
        </>
        
    )
}