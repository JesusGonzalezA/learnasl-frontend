import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Box, CardActionArea, Chip } from '@mui/material'
import { Test } from '../../models/test'
import { difficultyToColor } from '../../helpers/difficulty'
import { testTypeToString } from '../../helpers/testType'
import { useNavigate } from 'react-router-dom'

type CardTestProps = {
  test: Test
}

export const CardTest = ({test}: CardTestProps) => {
  const navigate = useNavigate()

  const handleOnClick = () => {
    navigate(`/test/review/${test.id}`)
  }

  return (
    <Card sx={{ minWidth: 340, maxWidth: 360, marginBottom: '10px' }} onClick={handleOnClick}>
      <CardActionArea>
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography gutterBottom variant="h6" component="div">
              { testTypeToString(test.testType) }
            </Typography>
            <Chip label={ test.difficulty } color={difficultyToColor(test.difficulty)} />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography variant="body1" color="text.secondary">
              Questions: { test.questions.length }
            </Typography>
            <Typography variant="body1" color="text.secondary">
              { new Date(test.createdOn).toLocaleDateString() } { new Date(test.createdOn).toLocaleTimeString(undefined, {hour: '2-digit', minute:'2-digit'}) }
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
