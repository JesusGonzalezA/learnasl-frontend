import { useCallback, useEffect, useState } from 'react'
import { Paper, Typography } from '@mui/material'
import { useAppDispatch } from '../../redux/hooks'
import * as StatsApi from '../../api/stats'
import { setErrors } from '../../redux/dashboard/dashboardSlice'

export const BestStreak = () => {
  const dispatch = useAppDispatch()
  const [stat, setStat] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const getStat = useCallback(async (abortController: AbortController) => {
    const response = await StatsApi.getBestStreak(abortController)
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
      <Typography variant='h4' component='h2'>Best streak: { (isLoading)? '...' : stat }</Typography>
    </Paper>
  )
}
