import { ReactNode } from 'react'
import { Field, FieldInputProps } from 'formik'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

export interface FormikSelectItem {
  label: string
  value: string
}

interface FormikSelectProps {
  name: string
  items: FormikSelectItem[]
  label: string
  required?: boolean,
  touched?: boolean,
  errorText?: string
}

interface MaterialUISelectFieldProps extends FieldInputProps<string> {
  children: ReactNode
  label: string
  required: boolean,
  hasError: boolean,
  errorText: string
}

const MaterialUISelectField = ({
  hasError,
  label,
  children,
  value,
  name,
  onChange,
  onBlur,
  required,
  errorText
}: MaterialUISelectFieldProps) => {
  return (
    <FormControl 
        fullWidth
        margin='normal'
        error={hasError}
    >
        <InputLabel required={required}>
            {label}
        </InputLabel>
        <Select name={name} onChange={onChange} onBlur={onBlur} value={value} label={`${label} *`}>
            {children}
        </Select>
        {
            hasError && (
                <FormHelperText>{ errorText }</FormHelperText>
            )
        }
    </FormControl>
  )
}

export const FormikSelect = ({ 
    name, 
    items, 
    label, 
    required,
    touched,
    errorText,
    ...rest
} : FormikSelectProps) => {
    return (
        <div>
        <Field
            { ...rest }
            name={name}
            as={MaterialUISelectField}
            label={label}
            hasError={errorText !== undefined && touched}
            errorText={errorText}
            helperText={touched && errorText}
            required={required}
        >
            {items.map(item => (
            <MenuItem key={item.value} value={item.value}>
                {item.label}
            </MenuItem>
            ))}
        </Field>
        </div>
    )
}
