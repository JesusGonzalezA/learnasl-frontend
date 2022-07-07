import { useCallback, useEffect, useState } from 'react'
import { Typography, TablePagination, Skeleton, Box, Card, CardContent, Grid } from '@mui/material'
import { Test } from '../models/test'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import * as TestApi from '../api/test'
import { CardTest } from '../components/test/CardTest'
import { setRecentFilter, setRecentPageNumber, setTotalTests } from '../redux/test/testSlice'
import { setErrors } from '../redux/dashboard/dashboardSlice'
import { Filter } from '../components/home/Filter'

interface Metadata {
  TotalCount: number
}

export const HomeScreen = () => {
  const { filters, totalTests } = useAppSelector(state => state.test)
  const { id } = useAppSelector(state => state.auth.user)
  const dispatch = useAppDispatch()
  const [recentTests, setRecentTests] = useState<Test[]>([])
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const getTests = useCallback(async (abortController: AbortController) => {
    return await TestApi.getTests({
      pageSize: filters.recent.pageSize, 
      pageNumber: filters.recent.pageNumber + 1,
      difficulty: filters.recent.difficulty,
      testType: filters.recent.type,
      fromDate: filters.recent.fromDate,
      toDate: filters.recent.toDate,
      userId: id ?? '',
    }, abortController)
  }, [id, filters.recent])

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(setRecentFilter({
      ...filters.recent,
      pageSize: parseInt(event.target.value, 10), 
      pageNumber: 0
    }))
  }

  const handleChangePage = (e : any, newPage: number) => {
    dispatch(setRecentPageNumber(newPage))
  }

  const handleChangeFilter = useCallback((value: any) => {
    const updatedFilter = { ...filters.recent, ...value }
    if (!updatedFilter.useDateFiltering) {
      delete updatedFilter.fromDate
      delete updatedFilter.toDate
    }
    delete updatedFilter.useDateFiltering
  
    if (JSON.stringify(filters.recent) !== JSON.stringify(updatedFilter)) {
      dispatch(setRecentFilter(updatedFilter))
    }
  }, [dispatch, filters.recent])

  useEffect(() => {
    const abortController = new AbortController()

    const fetchAndSet = async () => {
      setIsLoaded(false)
      getTests(abortController)
        .then( async (result) => {
          if (!result.ok)
          {
            const error = (result.status === 401) 
              ? 'Your session has expired. Login again.'
              : 'Something went wrong'
            dispatch(setErrors([error]))
            return
          }

          const body = await result.json() as Test[]
          const pagination = JSON.parse(result.headers.get('X-Pagination') ?? '') as Metadata
          
          dispatch(setTotalTests(pagination.TotalCount))
          setRecentTests(body)
          setIsLoaded(true)
        })
        .catch( () => {
          if (abortController.signal.aborted) return
          dispatch(setErrors(['Something went wrong']))
        })
    }

    fetchAndSet()

    return () => {
      abortController.abort()
    }
  }, [dispatch, getTests])

  return (
    <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        width={'100vw'}
    >
      <Typography variant='h3' component='h1'>Recent quizs</Typography>

      <TablePagination
        component="div"
        count={totalTests}
        page={filters.recent.pageNumber}
        onPageChange={handleChangePage}
        rowsPerPage={filters.recent.pageSize}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10]}
      />

      <Box sx={{minWidth: 340, maxWidth: 360, marginBottom: 3 }}>
        <Filter onChange={handleChangeFilter} value={filters.recent} />
      </Box>

      <Box sx={{ marginBottom: 3 }}>
        {
          (!isLoaded)
            ? (
              Array.from({ length: filters.recent.pageSize }).map((t, index) => (
                <Card sx={{minWidth: 340, maxWidth: 360, marginBottom: '10px'}} key={index}>
                  <CardContent>
                    <Box>
                      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <Skeleton animation="wave" variant="rectangular" width={'30%'} />
                        <Skeleton animation="wave" variant="circular" width={40} height={40} />
                      </Box> 
                      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Skeleton animation="wave" variant="rectangular" width={'30%'} />
                        <Skeleton animation="wave" variant="rectangular" width={'30%'} />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))
            )
            : (
              recentTests.map(t => ( <CardTest test={t} key={t.id} /> ))
            )
        }
      </Box>

    </Grid> 
  )
}
