import { useCallback, useEffect, useState } from 'react'
import { Box, CircularProgress, Paper, Typography } from '@mui/material'
import { useAppDispatch } from '../../redux/hooks'
import * as StatsApi from '../../api/stats'
import { setErrors } from '../../redux/dashboard/dashboardSlice'
import { PieChart } from 'react-minimal-pie-chart'

function getGreenToRed(percent : number){
  const r = percent<50 ? 255 : Math.floor(255-(percent*2-100)*255/100);
  const g = percent>50 ? 255 : Math.floor((percent*2)*255/100);
  return 'rgb('+r+','+g+',0)';
}

export const PercentLearnt = () => {
  const dispatch = useAppDispatch()
  const [stat, setStat] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const getStat = useCallback(async (abortController: AbortController) => {
    const response = await StatsApi.getPercentLearnt(abortController)
    return response
  }, [])

  useEffect(() => {
    const abortController = new AbortController()
    setIsLoading(true)

    const fetchStat = async () => {
      getStat(abortController)
        .then( async (result) => {
          if (!result.ok)
          {
            const error = (result.status === 401) 
              ? 'Your session has expired. Login again.'
              : 'Something went wrong'
            dispatch(setErrors([error]))
            return
          }

          const body = await result.json()
          setStat(body.stat)
          setIsLoading(false)
        })
        .catch( () => {
          if (abortController.signal.aborted) return
          dispatch(setErrors(['Something went wrong']))
        })
    }

    fetchStat()

    return () => {
      abortController.abort()
    }
  }, [dispatch, getStat, stat])

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Typography variant='h4' component='h2'>Percent learnt</Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center'}} >
        {
          (isLoading) ? (
            <Box sx={{ height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CircularProgress />
            </Box>
          ) : (
            <PieChart
              data={[{ value: Math.round(stat), color: getGreenToRed(stat) }]}
              style={{
                width: '200px'
              }}
              totalValue={100}
              lineWidth={20}
              label={({ dataEntry }) => Math.round(dataEntry.percentage) + '%'}
              labelStyle={{
                fontSize: '25px',
                fontFamily: 'sans-serif',
                fill: getGreenToRed(stat),
              }}
              labelPosition={0}
            />
          )
        }
      </Box>
    </Paper>
  )
}
