import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Formik } from 'formik'
import { LoadingButton } from '@mui/lab'
import { Box, Container, Typography } from '@mui/material'
import { FormikSelect } from '../../../components/formik/FormikSelect'
import { initialValues, testSchema as validationSchema } from '../../../helpers/create-test'
import { testTypeToString } from '../../../helpers/testType'
import { TestType, Difficulty } from '../../../models/test'
import { difficultyToString } from '../../../helpers/difficulty'
import { FormikField } from '../../../components/formik'
import { TestCreate } from '../../../models/test/testCreate'
import * as TestActions from '../../../api/test'
import { useAppDispatch } from '../../../redux/hooks'
import { setErrors } from '../../../redux/dashboard/dashboardSlice'

const testTypes = Object.entries(TestType).map(([key]) => {
  const label = testTypeToString(key as TestType)
  return ({
    label,
    value: key
  })
})

const difficulties = Object.entries(Difficulty).filter(d => d[1] !== Difficulty.NOTDEFINED).map(([key]) => {
  const label = difficultyToString(key as Difficulty)
  return ({
    label,
    value: key
  })
})

export const TestCreateScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSubmit = (values: TestCreate) : void => {
    setIsLoading(true)
    TestActions.createTest(values)
      .then( async (result) => {
        const body = await result.json()
        setIsLoading(false)

        if (!result.ok)
        {
          const errors = (result.status === 401) 
            ? ['Your session has expired. Login again.']
            : body.errors
          dispatch(setErrors(errors))
          return
        }

        navigate(`/test/do/${body.guid}`)
      })
      .catch(() => {
        setIsLoading(false)
        dispatch(setErrors(['Something went wrong']))
      })
  }

  return (
    <Container component='main'>
      <Box
          sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
          }}
      >
        <Typography variant='h3' component='h1'>Start a new test</Typography>

        <Box sx={{ 
            mt: 1, 
            maxWidth: 0.7,
            width: 400
        }}>
          <Formik 
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({isValid, dirty, errors, touched}) => (
              <Form>
                <div>
                  <FormikSelect
                    name='testType'
                    label='Test type'
                    items={testTypes}
                    touched={touched.testType}
                    errorText={errors.testType}
                    required
                  />
                </div>

                <div>
                  <FormikSelect
                      name='difficulty'
                      label='Difficulty'
                      items={difficulties}
                      touched={touched.difficulty}
                      errorText={errors.difficulty}
                      required
                  />
                </div>

                <div>
                  <FormikField
                    fullWidth
                    name='numberOfQuestions'
                    label='Number of questions'
                    touched={touched.numberOfQuestions}
                    errorText={errors.numberOfQuestions}
                    type='number'
                    margin='normal'
                    InputProps={{
                      inputProps: {
                        min: 1,
                        max: 15,
                        step: 1
                      }
                    }}
                    required
                  />
                </div>

                <LoadingButton 
                  variant='contained'
                  fullWidth
                  disabled={!dirty || !isValid}
                  sx={{ mt: 3, mb: 2 }}
                  type='submit'
                  loading={isLoading}
                >
                  Create test
                </LoadingButton>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Container>
  )
}
