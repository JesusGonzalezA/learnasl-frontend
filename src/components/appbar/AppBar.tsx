import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { useNavigate } from 'react-router-dom'
import { 
    AppBar as AppBarMui, 
    Container,
    Box,
    Toolbar, 
    Typography, 
    Tooltip, 
    IconButton, 
    Avatar, 
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import { thunkLogout } from '../../redux/auth/authSlice'
import { thunkDeleteCurrentTest } from '../../redux/test/testSlice'

interface AppBarProps {
    isGoBackVisible: boolean,
    sx?: any
}

export const AppBar = ({isGoBackVisible, sx} : AppBarProps) => {
    const navigate = useNavigate()
    const { email } = useAppSelector(state => state.auth.user)
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
    const dispatch = useAppDispatch()

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget) 
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null) 
    } 

    const handleLogout = () => {
        dispatch(thunkLogout())
    }

    const handleGoBack = () => {
        dispatch(thunkDeleteCurrentTest())
        navigate(-1)
    }

    return (
        <AppBarMui position='sticky' sx={sx} >
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    {
                        isGoBackVisible && 
                        (
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                onClick={handleGoBack}
                            >
                                <KeyboardReturnIcon />
                            </IconButton>
                        )
                    }
                    <Typography
                        variant='h6'
                        noWrap
                        component='div'
                        sx={{ flexGrow: 1 }}
                    >
                        Learn ASL
                    </Typography>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title='Pofile settings' onClick={handleOpenUserMenu}>
                            <IconButton sx={{ p: 0 }}>
                                <Avatar>
                                    { email.charAt(0).toLocaleUpperCase() }
                                </Avatar>
                            </IconButton>
                        </Tooltip>

                        <Menu
                            sx={{ mt: '45px' }}
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleLogout}>
                                <ListItemIcon>
                                    <LogoutIcon/>
                                </ListItemIcon>
                                <ListItemText>Logout</ListItemText>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBarMui>
    )
}
