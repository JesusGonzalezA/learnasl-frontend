import { Box, Container } from '@mui/material'
import { TestComponent } from '../../../components/test/Test'

export const TestDoScreen = () => {
  return (
    <Container component='main'>
      <Box
          sx={{
              marginTop: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
          }}
      >
        <TestComponent editable={true} />
      </Box>
    </Container>
  )
}
