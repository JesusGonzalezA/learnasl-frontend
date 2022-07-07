import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { AppRouter } from './routers/AppRouter'

const theme = createTheme()

const LearnASLApp = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Provider store={store}>
                <AppRouter />
            </Provider>
        </ThemeProvider>
    )
}

export default LearnASLApp