import { LoadingButton } from "@mui/lab"
import { Box, Button } from "@mui/material"

interface NavButtonsProps {
    editable: boolean,
    page: number,
    handleOnPageChange: Function,
    testLength?: number,
    handleStop: Function,
    handleFinish: Function,
    loading: boolean
}

export const NavButtons = ({
    editable,
    page,
    handleOnPageChange,
    testLength,
    handleStop,
    handleFinish,
    loading
} : NavButtonsProps) => {
  return (
    <Box sx={{ marginTop: 3, display: 'flex', width: '80%', justifyContent: 'space-between'}}>
        <Button 
            variant='outlined'
            onClick={() => { handleOnPageChange({}, page-1) }}
            disabled={(page)===1 || loading}
            sx={{ mt: 3, mb: 2, padding: 1 }}
        >
            Previous
        </Button>

        {
            (editable && (page)===testLength) 
            ? (
                <>
                    <LoadingButton
                        variant='contained'
                        onClick={() => handleFinish()}
                        loading={loading}
                        sx={{ mt: 3, mb: 2, padding: 1 }}
                    >
                        Send test
                    </LoadingButton>
                </>
            )
            : (
                <>
                    <LoadingButton
                        variant='contained'
                        onClick={() => { handleOnPageChange({}, page+1) }}
                        disabled={(page)===testLength}
                        loading={loading}
                        sx={{ mt: 3, mb: 2, padding: 1 }}
                    >
                        Next
                    </LoadingButton>

                    <Button 
                        variant='contained'
                        color='warning'
                        onClick={() => { handleStop() }}
                        sx={{ mt: 3, mb: 2, padding: 1 }}
                    >
                        Stop
                    </Button>
                </>
            )
        }
        
    </Box>
  )
}
