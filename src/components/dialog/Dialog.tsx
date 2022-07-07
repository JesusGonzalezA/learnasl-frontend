import { useState } from 'react'
import Button from '@mui/material/Button'
import MuiDialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export interface DialogProps {
  color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined,
  messageButton: string,
  title: string,
  content: string,
  component: React.ReactNode
}

export const Dialog = ({ 
  color,
  messageButton, 
  title, 
  content, 
  component
}: DialogProps) => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button variant="outlined" onClick={ handleClickOpen } color={color}>
        { messageButton }
      </Button>
      <MuiDialog open={ open } onClose={ handleClose }>
        <DialogTitle>{ title }</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ marginBottom: 1 }}>
            { content }
          </DialogContentText>
          { component }
        </DialogContent>
      </MuiDialog>
    </div>
  )
}
