import { Box, Container, Grid, Typography } from '@mui/material'
import { BestStreak } from '../../components/stats/BestStreak'
import { CurrentStreak } from '../../components/stats/CurrentStreak'
import { NewWordsLearnt } from '../../components/stats/NewWordsLearnt'
import { PercentLearnt } from '../../components/stats/PercentLearnt'
import { SuccessRate } from '../../components/stats/SuccessRate'
import { UseOfTheApp } from '../../components/stats/UseOfTheApp'

export const StatsScreen = () => {
  return (
    <Container component='main' sx={{marginBottom: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant='h3' component='h1' sx={{ marginBottom: 3 }}>My stats</Typography>

        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={12} sm={4} md={4}><PercentLearnt /></Grid>
          <Grid item xs={12} sm={4} md={4}><CurrentStreak /></Grid>
          <Grid item xs={12} sm={4} md={4}><BestStreak /></Grid>
          <Grid item xs={12} sm={4} md={4}><UseOfTheApp /></Grid>
          <Grid item xs={12} sm={4} md={4}><NewWordsLearnt /></Grid>
          <Grid item xs={12} sm={4} md={4}><SuccessRate /></Grid>
        </Grid>
      </Box>
    </Container>
  )
}
