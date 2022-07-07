import * as Yup from 'yup'

export const testSchema = Yup.object().shape({
    testType: Yup.string().required('Required'),
    difficulty: Yup.string().required('Required'),
    numberOfQuestions: Yup.number().required('Required')
})