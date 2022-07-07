import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'
import { AuthRoutes } from './AuthRoutes'
import { DashboardRoutes } from './DashboardRoutes'

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route 
                    path='/auth/*'
                    element={
                        <PublicRoute>
                            <AuthRoutes />
                        </PublicRoute>
                    }
                />

                <Route 
                    path='/*' 
                    element={
                        <PrivateRoute>
                            <DashboardRoutes />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}