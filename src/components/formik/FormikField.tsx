import { useState } from 'react'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import { Field } from 'formik'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

type FormikFieldProps = TextFieldProps & {
    touched?: boolean,
    errorText?: string
}

export const FormikField = ({
    name, 
    label, 
    variant, 
    required, 
    touched, 
    errorText, 
    type,
    ...rest
} : FormikFieldProps) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    const getType = () => {
        if (type === 'password'){
            return (showPassword)? 'text' : 'password'
        }
        else 
            return type    
    }

    return (
        <div>
            <Field 
                { ...rest }
                as={TextField}
                required={required}
                autoComplete='off'
                name={name}
                label={label} 
                variant={variant} 
                error={errorText !== undefined && touched}
                helperText={touched && errorText}
                type={getType()}
                InputProps={{
                    ...rest.InputProps,
                    startAdornment: type==='password' && 
                    (
                        <InputAdornment position="start">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="start"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    )
}