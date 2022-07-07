import { 
    TestType,
    QuestionQA, 
    Test, 
    QuestionOptionVideoToWord,
    QuestionOptionWordToVideo,
    QuestionMimic
} from '../../models/test'
import { answerToLabel } from './answerToLabel'

export const getNumberOfCorrectAnswersFromTest = (test? : Test) => {
    if (!test) return 0
    
    switch(test.testType){
        case TestType.Mimic:
        case TestType.Mimic_Error:
            return (test.questions as QuestionMimic[]).filter(q => q.isCorrect).length
        case TestType.QA:
        case TestType.QA_Error:
            return (test.questions as QuestionQA[]).filter(q => q.isCorrect).length
        case TestType.OptionVideoToWord:
        case TestType.OptionVideoToWord_Error:
            return (test.questions as QuestionOptionVideoToWord[]).filter(q => q.correctAnswer === q.userAnswer).length
        case TestType.OptionWordToVideo:
        case TestType.OptionWordToVideo_Error:
            return (test.questions as QuestionOptionWordToVideo[]).filter((q) => {
                const possibleAnswers = [q.possibleAnswer0, q.possibleAnswer1, q.possibleAnswer2, q.possibleAnswer3]
                return answerToLabel(possibleAnswers, q.correctAnswer) === q.userAnswer
            }).length
        default: 
            return 0
    }
}