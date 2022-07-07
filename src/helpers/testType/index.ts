import { TestType } from '../../models/test/testType'

export const testTypeToString = (testType: TestType) => {
    switch (testType as TestType) {
        case TestType.Mimic:
            return 'Mimic'
        case TestType.Mimic_Error:
            return 'Mimic - Error Test'

        case TestType.QA:
            return 'QA'
        case TestType.QA_Error:
            return 'QA - Error Test'

        case TestType.OptionVideoToWord:
            return 'Video to word'
        case TestType.OptionVideoToWord_Error:
            return 'Video to word - Error Test'
        
        case TestType.OptionWordToVideo:
            return 'Word to video'
        case TestType.OptionWordToVideo_Error:
            return 'Word to video - Error Test'
                   
        default:
            return 'Not found'
    }
}