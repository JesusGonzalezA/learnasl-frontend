import getBaseUrl from '../helpers/getBaseUrl'
import {
    NumberOfLearntWordsQueryFilter,
    UseOfTheAppQueryFilter,
    SuccessRateQueryFilter
} from '../../models/queryFilters'
import { PersistenceService } from '../../services/persistenceService'
import { Difficulty } from '../../models/test'

const baseURL = getBaseUrl()
const getToken = () => {
    return new PersistenceService().get('user')?.token
}
const baseEndpoint = `${baseURL}/stats`

const getUseOfTheApp = (filter : UseOfTheAppQueryFilter, abortController: AbortController) => {
    return fetch(`${baseEndpoint}/use-of-the-app?Year=${filter.year}&Month=${filter.month}`, {
        signal: abortController.signal,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}

const getBestStreak = (abortController: AbortController) => {
    return fetch(`${baseEndpoint}/best-streak`, {
        signal: abortController.signal,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}

const getCurrentStreak = (abortController: AbortController) => {
    return fetch(`${baseEndpoint}/current-streak`, {
        signal: abortController.signal,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}

const getNumberOfLearntWords = (filter: NumberOfLearntWordsQueryFilter, abortController: AbortController) => {
    return fetch(`${baseEndpoint}/number-of-learnt-words?Year=${filter.year}${(filter.month !== undefined) ? `&Month=${filter.month}` : '' }${(filter.day !== undefined) ? `&Day=${filter.day}` : '' }`, {
        signal: abortController.signal,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}

const getPercentLearnt = (abortController: AbortController) => {
    return fetch(`${baseEndpoint}/percent-learnt`, {
        signal: abortController.signal,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}

const getSuccessRate = (filter : SuccessRateQueryFilter,abortController: AbortController) => {
    const query = `?Year=${filter.year}` 
        + `${(filter.month !== undefined) ? `&Month=${filter.month}` : '' }`
        + `${(filter.day !== undefined) ? `&Day=${filter.day}` : '' }`
        + `${(filter.difficulty !== Difficulty.NOTDEFINED) ? `&Difficulty=${filter.difficulty}` : '' }`
    return fetch(`${baseEndpoint}/success-rate${query}`, {
        signal: abortController.signal,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}

export {
    getUseOfTheApp,
    getBestStreak,
    getCurrentStreak,
    getNumberOfLearntWords,
    getPercentLearnt,
    getSuccessRate
}