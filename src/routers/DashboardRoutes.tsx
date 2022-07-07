import { useRef, useState, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Box, CssBaseline, Paper } from '@mui/material'

import { 
    HomeScreen,
    NotFoundScreen,
    ProfileScreen,
    StatsScreen,
    TestCreateScreen,
    TestDoScreen,
    TestReviewScreen
} from '../screens'
import { BottomBarNav } from '../components/nav/BottomBarNav'
import { AppBar } from '../components/appbar/AppBar'
import { useAppSelector } from '../redux/hooks'
import { DashboardAlert } from '../components/alert'

const routesWithoutBottomBar : RegExp[] = [
    /\/test\/do\/.+/,
    /\/test\/review\/.+/,
]

export const DashboardRoutes = () => {
    const location = useLocation()
    const { errors, messages } = useAppSelector(state => state.dashboard)
    const ref = useRef<HTMLDivElement>(null)
    const pathname = window.location.pathname
    const [value, setValue] = useState(pathname)
    const [isBottomBarVisible, setIsBottomBarVisible] = useState(true)
    const [isGoBackVisible, setIsGoBackVisible] = useState(true)

    useEffect(() => {
        let isRouteWithoutBottomBar = false
        routesWithoutBottomBar.forEach(route => {
            if (location.pathname.match(route)) {
                isRouteWithoutBottomBar = true
            }
        })

        setIsBottomBarVisible(!isRouteWithoutBottomBar)
        setIsGoBackVisible(isRouteWithoutBottomBar)
    }, [location.pathname])

    const handleChange = (_ : React.SyntheticEvent, newValue : any) => {
      setValue(newValue)
    }

    return (
        <>
            <Box sx={{ pb: 7 }} ref={ref}>
                <AppBar isGoBackVisible={isGoBackVisible} sx={{ marginBottom: '10px' }} />
                
                <CssBaseline />
                <Routes>
                    <Route path='' element={<HomeScreen />} />
                    <Route path='profile' element={<ProfileScreen />} />
                    <Route path='test/new' element={<TestCreateScreen />} />
                    <Route path='stats' element={<StatsScreen />} />
                    <Route path='404' element={<NotFoundScreen />} />

                    <Route path='test/do/:id' element={<TestDoScreen />} />
                    <Route path='test/review/:id' element={<TestReviewScreen />} />

                    <Route path='*' element={<Navigate to='404' />} />
                </Routes>

                {
                    isBottomBarVisible && (
                        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                            <BottomBarNav value={value} onChange={handleChange}/>
                        </Paper>
                    )
                }
            </Box>

            {
                errors.map((error, index) => (
                    <DashboardAlert 
                        key={index}
                        message={error}
                        type='error'
                        position={{horizontal: 'center', vertical: 'bottom'}}
                    /> 
                ))
            }

            {
                messages.info.map((info, index) => (
                    <DashboardAlert 
                        key={index}
                        message={info}
                        type={'info'}
                        position={{horizontal: 'center', vertical: 'bottom'}}
                    /> 
                ))
            }
        </>
    )
}