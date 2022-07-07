import { Box, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { fetchVideoAndSet } from '../../helpers/test'
import { QuestionMimic as QuestionModel } from '../../models/test'
import { useAppSelector } from '../../redux/hooks'
import VideoRecorder from 'react-video-recorder'

const width = '320'
const height = '240'

interface QuestionMimicProps {
  question: QuestionModel,
  editable: boolean,
  setCurrentAnswer: Function
}

const baseOptions = {
  constraints : {
    audio: false,
    video: true
  },
  
  timeLimit: 7000
}

const recordOptions = {
  ...baseOptions,
  isOnInitially: true,
  isFlipped: true
}

const uploadOptions = {
  ...baseOptions,
  useVideoInput: true
}

export const QuestionMimic = ({
  question, editable, setCurrentAnswer
} : QuestionMimicProps) => {
    const { token } = useAppSelector(state => state.auth.user)
    const [option, setOption] = useState<string>('Record')
    const refVideoHelp = useRef<HTMLVideoElement>(null)
    const refVideoUser = useRef<HTMLVideoElement>(null)
    const refVideoRecorder = useRef<any>(null)

    useEffect(() => {
        fetchVideoAndSet(question.videoHelp ?? '', token ?? '', refVideoHelp)
        fetchVideoAndSet(question.videoUser ?? '', token ?? '', refVideoUser)
    },[question.videoHelp, question.videoUser, token, editable])

    const onRecordingComplete = (videoBlob: Blob) => {
      const file = new File([videoBlob], `${question.id}.mp4`)
      setCurrentAnswer(file)
    }

    useEffect(() => {
      if(!refVideoRecorder.current || question.videoUser) return
      
      refVideoRecorder.current.handleStopReplaying()
    }, [refVideoRecorder, question])

    return (
        <Box sx={{ width: '80%' }}>
            <Box sx={{ alignSelf: 'flex-start', marginBottom: 3}}>
              <Typography variant='h5' component='h2'>
                  Try signing: '{ question?.wordToGuess ?? '' }'
              </Typography>

              <p>Help video</p>
              <video width={width} height={height} ref={refVideoHelp} controls />
            </Box>

            <Box sx={{ marginTop: 3 }}>
            {
              (editable) 
              ? (
                
                <div>

                  {
                    question.videoUser && (
                      <div>
                        <p>Your current video</p>
                        <video width={width} height={height} ref={refVideoUser} controls />
                      </div>
                    )
                  }

                  <ToggleButtonGroup
                    color="primary"
                    value={option}
                    exclusive
                    onChange={(e, value) => setOption(value)}
                  >
                    <ToggleButton value="Record">Record</ToggleButton>
                    <ToggleButton value="Upload">Upload</ToggleButton>
                  </ToggleButtonGroup>

                  <div style={{ width: `${width}px` }}>
                    { (option === 'Record') 
                      ? 
                        <>
                          <VideoRecorder
                            ref={refVideoRecorder}
                            {...recordOptions}
                            onRecordingComplete={onRecordingComplete}
                          />
                        </>
                      : 
                        <div>
                          <VideoRecorder
                            {...uploadOptions}
                            onRecordingComplete={onRecordingComplete}
                          />
                        </div>
                    }
                  </div>
                </div>
              )
              : (
                <>
                  <p>User video</p>
                  <video width={width} height={height} ref={refVideoUser} controls />

                  <p>The sign is { (question.isCorrect) ? 'correct' : 'incorrect' }</p>
                </>
              )
            }
            </Box>
        </Box>
    )
}
