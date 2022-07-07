import { Navigate } from 'react-router'
import { useAppSelector } from '../redux/hooks'

export const PublicRoute = ({ children } : any) => {

    const { token } = useAppSelector(state => state.auth.user)

    return token
        ? <Navigate to="/" />
        : children
}