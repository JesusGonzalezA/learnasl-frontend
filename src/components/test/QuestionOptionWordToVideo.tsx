import { useEffect, useMemo, useRef, useState } from 'react'
import { QuestionOptionWordToVideo as QuestionModel } from '../../models/test'
import { useAppSelector } from '../../redux/hooks'
import { Box, Grid, Typography } from '@mui/material'
import RadioGroup from '@mui/material/RadioGroup'
import FormControl from '@mui/material/FormControl'
import {
    computeTypeOptionWordToVideo as computeType, 
    fetchVideoAndSet 
} from '../../helpers/test'
import { VideoAnswer } from './VideoAnswer'

interface QuestionOptionWordToVideoProps {
    question: QuestionModel,
    editable: boolean,
    setCurrentAnswer: Function
}

export const QuestionOptionWordToVideo = ({ setCurrentAnswer, question, editable } : QuestionOptionWordToVideoProps) => {
    const { token } = useAppSelector(state => state.auth.user)
    const questions = useMemo(() => (
        [
            question.possibleAnswer0, 
            question.possibleAnswer1, 
            question.possibleAnswer2, 
            question.possibleAnswer3
        ])
    , [question])
    const [value, setValue] = useState<string>(question.userAnswer ?? '')
    const refPossibleAnswer0 = useRef<HTMLVideoElement>(null)
    const refPossibleAnswer1 = useRef<HTMLVideoElement>(null)
    const refPossibleAnswer2 = useRef<HTMLVideoElement>(null)
    const refPossibleAnswer3 = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        fetchVideoAndSet(question.possibleAnswer0, token ?? '', refPossibleAnswer0)
        fetchVideoAndSet(question.possibleAnswer1, token ?? '', refPossibleAnswer1)
        fetchVideoAndSet(question.possibleAnswer2, token ?? '', refPossibleAnswer2)
        fetchVideoAndSet(question.possibleAnswer3, token ?? '', refPossibleAnswer3)
    },[question, token])

    useEffect(() => {
        setValue(question.userAnswer ?? '')
    }, [question, questions])

    const handleOnChange = (ev : any, value : string) => {
        if (editable) {
            setValue(value)
            setCurrentAnswer(value)
        }
    }

    const handleComputeType = (label : string ) => {
        return computeType(label, editable, question, questions)
    }

    return (
        <Box sx={{ width: '80%' }}>
            <Typography variant='h5' component='h2' sx={{ alignSelf: 'flex-start', marginBottom: 3}}>
                Guess: '{ question?.wordToGuess ?? '' }'
            </Typography>

            <FormControl>
                <RadioGroup value={value} onChange={handleOnChange}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={4} sm={4} md={6}>
                            <VideoAnswer 
                                handleOnChange={() => handleOnChange({}, 'A')}
                                refAnswer={refPossibleAnswer0}
                                label='A'
                                type={handleComputeType('A')}
                            />
                        </Grid>
                        <Grid item xs={4} sm={4} md={6}>
                            <VideoAnswer 
                                handleOnChange={() => handleOnChange({}, 'B')}
                                refAnswer={refPossibleAnswer1}
                                label='B'
                                type={handleComputeType('B')}
                            />
                        </Grid>
                        <Grid item xs={4} sm={4} md={6}>
                            <VideoAnswer 
                                handleOnChange={() => handleOnChange({}, 'C')}
                                refAnswer={refPossibleAnswer2}
                                label='C'
                                type={handleComputeType('C')}
                            />
                        </Grid>
                        <Grid item xs={4} sm={4} md={6}>
                            <VideoAnswer 
                                handleOnChange={() => handleOnChange({}, 'D')}
                                refAnswer={refPossibleAnswer3}
                                label='D'
                                type={handleComputeType('D')}
                            />
                        </Grid>
                    </Grid>
                </RadioGroup>
            </FormControl>
        </Box>
    )
}
