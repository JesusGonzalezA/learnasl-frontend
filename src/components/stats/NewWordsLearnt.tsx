import { useCallback, useEffect, useState } from 'react'
import { FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, Typography } from '@mui/material'
import { useAppDispatch } from '../../redux/hooks'
import * as StatsApi from '../../api/stats'
import { setErrors } from '../../redux/dashboard/dashboardSlice'
import { NumberOfLearntWordsQueryFilter } from '../../models/queryFilters'

enum FilterType {
    year = 'year', month = 'month', day = 'day'
}

interface IFilter {
    value: NumberOfLearntWordsQueryFilter,
    type: FilterType
}

export const NewWordsLearnt = () => {
  const dispatch = useAppDispatch()
  const [stat, setStat] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [apiFilter, setApiFilter] = useState<IFilter>({
      type: FilterType.year,
      value: { year: new Date().getFullYear() }
  })

  const onChangeFilter = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    let newApiFilter : IFilter = {
        type: FilterType.year,
        value: { year: new Date().getFullYear() }
    }

    switch(value as FilterType) {
        case FilterType.day: 
            newApiFilter = {
                type: FilterType.day,
                value: {
                    ...newApiFilter.value,
                    month: new Date().getMonth() + 1,
                    day: new Date().getDate()
                }
            }
            break;
        case FilterType.month: 
            newApiFilter = {
                type: FilterType.month,
                value: {
                    ...newApiFilter.value,
                    month: new Date().getMonth() + 1
                }
            }
            break;
        case FilterType.year:
            newApiFilter = {
                type: FilterType.year,
                value: {
                    ...newApiFilter.value
                }
            }
            break;
    }

    setApiFilter(newApiFilter)
    setIsLoading(true)
  }

  const getStat = useCallback(async (abortController: AbortController) => {
    const response = await StatsApi.getNumberOfLearntWords(apiFilter.value, abortController)
    return response
  }, [apiFilter])

  useEffect(() => {
    const abortController = new AbortController()

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
  }, [dispatch, getStat])

    return (
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant='h4' component='h2'>
          New words learnt: { (isLoading)? '...' : stat }
        </Typography>

        <FormControl>
            <FormLabel>Filter by</FormLabel>
            <RadioGroup value={apiFilter.type} onChange={onChangeFilter}>
                <FormControlLabel value={FilterType.day} control={<Radio />} label='Day' />
                <FormControlLabel value={FilterType.month} control={<Radio />} label='Month' />
                <FormControlLabel value={FilterType.year} control={<Radio />} label='Year' />
            </RadioGroup>
        </FormControl>
      </Paper>
  )
}
