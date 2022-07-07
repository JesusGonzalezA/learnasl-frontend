import { Navigate } from 'react-router'
import { useAppSelector } from '../redux/hooks'

export const PrivateRoute = ({ children } : any) => {

    const { token } = useAppSelector(state => state.auth.user)

    return token
        ? children
        : <Navigate to="/auth" />
}