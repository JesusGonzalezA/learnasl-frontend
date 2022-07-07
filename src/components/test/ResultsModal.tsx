import { Box } from '@mui/system'
import { Modal, Typography } from '@mui/material'
import { Test } from '../../models/test'
import { getNumberOfCorrectAnswersFromTest } from '../../helpers/test'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
}

interface ResultsModalProps {
    onClose: ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void) | undefined,
    open: boolean,
    test?: Test
}

export const ResultsModal = ({
    onClose, open, test
} : ResultsModalProps) => {

    const total = test?.questions.length ?? 0
    const correct = getNumberOfCorrectAnswersFromTest(test)
    const incorrect = total - correct

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Typography variant="h2" component="h2">
                Test results
                </Typography>

                <Typography sx={{ mt: 2 }}>
                    <b>Total questions:</b> { total }
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    <b>Correct:</b> { correct }
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    <b>Incorrect:</b> { incorrect }
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    <b>Score:</b> { (100 * correct/total).toFixed() } %
                </Typography>
            </Box>
        </Modal>
    )
}
