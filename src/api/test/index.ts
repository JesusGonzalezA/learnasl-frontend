import getBaseUrl from '../helpers/getBaseUrl'
import { TestQueryFilter } from '../../models/queryFilters/'
import { PersistenceService } from '../../services/persistenceService'
import { TestCreate, TestGet, TestReply } from '../../models/test'

const baseURL = getBaseUrl()
const getToken = () => {
    return new PersistenceService().get('user')?.token
} 
const baseEndpoint = `${baseURL}/test`
const baseQuestionEndpoint = `${baseURL}/question`

const setToUrlSearchParamsIfDefined = (params: URLSearchParams, key: string, value: string | undefined) => {
    if (value === undefined) return;

    params.set(key, value)
}

const testQueryFilterToUrlSearchParams = (filter: TestQueryFilter) : URLSearchParams => {
    const params = new URLSearchParams()

    setToUrlSearchParamsIfDefined(params, 'PageNumber', filter.pageNumber.toString())
    setToUrlSearchParamsIfDefined(params, 'PageSize', filter.pageSize.toString())
    setToUrlSearchParamsIfDefined(params, 'TestType', filter.testType?.toString())
    setToUrlSearchParamsIfDefined(params, 'Difficulty', filter.difficulty?.toString())
    setToUrlSearchParamsIfDefined(params, 'ToDate', filter.toDate?.toString())
    setToUrlSearchParamsIfDefined(params, 'FromDate', filter.fromDate?.toString())

    return params
}

const getTests = (filter : TestQueryFilter, abortController: AbortController) => {
    const params = testQueryFilterToUrlSearchParams(filter)

    return fetch(`${baseEndpoint}?${params.toString()}`, {
        signal: abortController.signal,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}

const createTest = (test: TestCreate) => {
    return fetch(`${baseEndpoint}?NumberOfQuestions=${test.numberOfQuestions.toString()}&TestType=${test.testType}&Difficulty=${test.difficulty}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}

const getTest = ({id, populated} : TestGet) => {
    return fetch(`${baseEndpoint}/${id}?populated=${populated}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}

const replyToQuestion = ({id, testType, userAnswer, videoUser} : TestReply) => {
    const formdata = new FormData()

    videoUser && formdata.append('VideoUser', videoUser)
    userAnswer && formdata.append('UserAnswer', userAnswer)
    formdata.append('TestType', testType)

    const params = {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
        body: formdata
    }

    return fetch(`${baseQuestionEndpoint}/${id}`, params)
}

const deleteAllTests = (abortController: AbortController) => {
    return fetch(`${baseEndpoint}`, {
        signal: abortController.signal,
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}

export {
    getTest,
    getTests,
    createTest,
    replyToQuestion,
    deleteAllTests
}