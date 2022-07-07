import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { 
  Difficulty, 
  QuestionMimic as QuestionMimicModel, 
  QuestionOptionVideoToWord as QuestionOptionVideoToWordModel, 
  QuestionOptionWordToVideo as QuestionOptionWordToVideoModel, 
  QuestionQA as QuestionQAModel,
  TestInPersistence
} from '../../models/test'
import { setErrors } from '../../redux/dashboard/dashboardSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getTestAsync } from '../../redux/test/actions'
import { PersistenceService } from '../../services/persistenceService'
import Pagination from '@mui/material/Pagination'
import { Box, Button, Chip, Divider, PaginationItem, Typography } from '@mui/material'
import { thunkDeleteCurrentTest, thunkSetCurrentTest, thunkSetPage } from '../../redux/test/testSlice'
import { testTypeToString } from '../../helpers/testType'
import { TestType } from '../../models/test'
import { difficultyToColor } from '../../helpers/difficulty'
import { QuestionOptionWordToVideo } from './QuestionOptionWordToVideo'
import { BaseQuestion } from '../../models/test/question';
import { QuestionOptionVideoToWord } from './QuestionOptionVideoToWord';
import { QuestionMimic } from './QuestionMimic'
import { QuestionQA } from './QuestionQA'
import InfoIcon from '@mui/icons-material/Info'
import { ResultsModal } from './ResultsModal'
import { NavButtons } from './NavButtons'
import * as TestApi from '../../api/test'

interface ITestProps {
  editable: boolean
} 

interface Answer {
  videoUser?: Blob,
  userAnswer?: string
}

export const TestComponent = ({editable} : ITestProps) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { currentTest } = useAppSelector(state => state.test)
  const [page, setPage] = useState<number>(currentTest.page ?? 1)
  const [open, setOpen] = useState<boolean>(false)
  const [currentAnswer, setCurrentAnswer] = useState(null)
  const [refTitle, setRefTitle] = useState<HTMLDivElement>()
  const [refInfo, setRefInfo] = useState<HTMLDivElement>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  const handleRefTitle = useCallback((node) => {
    setRefTitle(node)
  }, [])

  const handleRefInfo = useCallback((node) => {
    setRefInfo(node)
  }, [])

  useEffect(() => {
    if(!refTitle || !refInfo) return

    const titleWidth = refTitle.offsetWidth
    refInfo.style.width = `${titleWidth}px`
  }, [refInfo, refTitle, currentTest.test])

  useEffect(() => {
    return (() => {
      dispatch(thunkDeleteCurrentTest())
    })
  }, [dispatch])

  useEffect(() => {
    // Only get if neccessary
    const currentInPersistence = new PersistenceService().get('currentTest') as TestInPersistence
    if (currentInPersistence?.test?.id === id) return

    dispatch(getTestAsync({ id: id ?? '', populated: true }))
  }, [dispatch, id])

  useEffect(() => {
    if (currentTest?.errors !== []) {
      dispatch(setErrors(currentTest?.errors))
    }
  }, [dispatch, currentTest?.errors])

  useEffect(() => {
    setCurrentAnswer(null)
  }, [page])
  
  const handleOpenModal = () => { setOpen(true) }
  const handleCloseModal = () => { setOpen(false) }

  const handleStop = () => {
    navigate(-1)
  }

  const createAnswer = () => {
    if (currentAnswer === null) return 

    let answer : Answer = {}
    
    switch(currentTest.test?.testType as TestType) {
      case TestType.Mimic:
      case TestType.Mimic_Error:
      case TestType.QA:
      case TestType.QA_Error:
        answer = {
          videoUser: currentAnswer
        }
        break;
      case TestType.OptionVideoToWord:
      case TestType.OptionVideoToWord_Error:
      case TestType.OptionWordToVideo:
      case TestType.OptionWordToVideo_Error:
        answer = {
          userAnswer: currentAnswer
        }
        break;
    }

    return answer
  }

  const sendReply = async (newPage : number) => {
    const answer = createAnswer()

    if (!answer) {
      goToPage(newPage)
      return
    }

    setIsLoading(true)
    await TestApi.replyToQuestion({
      id: currentTest.test?.questions[page-1].id ?? '', 
      testType: currentTest.test?.testType as TestType, 
      userAnswer: answer?.userAnswer,
      videoUser: answer?.videoUser
    })
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
        
        const persistence = new PersistenceService()
        const testInPersistence = persistence.get('currentTest') as TestInPersistence
        const test = testInPersistence.test
        test.questions = test.questions.map((q) => (
          (q.id !== currentTest.test?.questions[page-1].id) 
            ? q 
            : {
                ...q,
                ...body
              }
        ))
        
        dispatch(thunkSetCurrentTest(test))
        goToPage(newPage)
      })
      .catch( (err) => {
        dispatch(setErrors(['Something went wrong']))
      })
    setIsLoading(false)
  }

  const goToPage = (page: number) => {
    dispatch(thunkSetPage(page))
    setPage(page)
  }

  const handleOnPageChange = async (e : any, page : number) => {
    if (!editable || currentAnswer === null) {
      goToPage(page)
      return
    }
    if (currentAnswer !== null) await sendReply(page)
  }

  const handleFinish = async (e : any) => {
    await sendReply(1)
    handleStop()
  }

  const renderQuestion = (page : number) => {
    const question = currentTest.test?.questions[page-1] as BaseQuestion
    if (!question) return

    switch(currentTest.test?.testType) {
      case TestType.OptionWordToVideo:
      case TestType.OptionWordToVideo_Error:
        return (
          <QuestionOptionWordToVideo setCurrentAnswer={setCurrentAnswer} question={question as QuestionOptionWordToVideoModel} editable={editable} />
        )
      case TestType.OptionVideoToWord:
      case TestType.OptionVideoToWord_Error:
        return (
          <QuestionOptionVideoToWord setCurrentAnswer={setCurrentAnswer} question={question as QuestionOptionVideoToWordModel} editable={editable} />
        )
      case TestType.Mimic:
      case TestType.Mimic_Error:
        return (
          <QuestionMimic setCurrentAnswer={setCurrentAnswer} question={question as QuestionMimicModel} editable={editable} />
        )
      case TestType.QA:
      case TestType.QA_Error:
        return (
          <QuestionQA setCurrentAnswer={setCurrentAnswer} question={question as QuestionQAModel} editable={editable} />
        )
    }
  }

  return (
    <>
      <Pagination 
        page={page}
        onChange={handleOnPageChange}
        count={currentTest.test?.questions.length}
        renderItem={ (item) => 
          <PaginationItem 
            {...item}
          />
        } 
      />

      <Typography sx={{ marginTop: 3 }} ref={handleRefTitle} variant='h3' component='h1'>
        { testTypeToString(currentTest.test?.testType as TestType) }
      </Typography>

      <Box ref={handleRefInfo} sx={{ marginTop: 3, minWidth: 300, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
        <Chip 
          label={ currentTest.test?.difficulty as Difficulty } 
          color={difficultyToColor(currentTest.test?.difficulty as Difficulty)} 
          />
        { !editable &&
          <>
            <Button variant="outlined" startIcon={<InfoIcon />} onClick={ handleOpenModal }>
              Show test results
            </Button>

            <ResultsModal open={open} onClose={handleCloseModal} test={currentTest.test} /> 
          </>
        }
      </Box>
      
      <Divider sx={{ marginTop: 3, marginBottom: 3, width: '80%' }} variant="middle" />

      { renderQuestion(page) }

      <NavButtons 
        editable={editable}
        page={page} 
        handleOnPageChange={handleOnPageChange} 
        testLength={currentTest.test?.questions.length} 
        handleStop={handleStop} 
        handleFinish={handleFinish}
        loading={isLoading}
      />
    </>
  )
}
