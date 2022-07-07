import { PersistenceService } from '../../services/persistenceService'
import getBaseUrl from '../helpers/getBaseUrl'

const baseURL = getBaseUrl()
const baseEndpoint = `${baseURL}/auth`

const getToken = () => {
    return new PersistenceService().get('user')?.token
} 

const loginAsync = async (email : string, password : string) => {
    return fetch(`${baseEndpoint}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email, password
        })
    })
}

const registerAsync = async (email: string, password : string) => {
    return fetch(`${baseEndpoint}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email, password
        })
    })
}

const startPasswordRecoveryAsync = (email : string) => {
    return fetch(`${baseEndpoint}/password-recovery/start?email=${email}`, {
        method: 'PUT'
    })
}

const startEmailConfirmationAsync = (email : string) => {
    return fetch(`${baseEndpoint}/email-confirmation/start?email=${email}`, {
        method: 'PUT'
    })
}

const recoverPasswordAsync = (token : string, email : string, password : string) => {
    return fetch(`${baseEndpoint}/password-recovery?token=${token}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email, password
        })
    })
}

const confirmEmailAsync = (email : string, token : string) => {
    return fetch(`${baseEndpoint}/email-confirmation?email=${email}&token=${token}`, {
        method: 'PUT'
    })
}

const changeEmailAsync = (email : string) => {
    return fetch(`${baseEndpoint}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
}

const deleteMyAccountAsync = () => {
    return fetch(`${baseEndpoint}/delete`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}

export {
    loginAsync,
    registerAsync,
    startPasswordRecoveryAsync,
    startEmailConfirmationAsync,
    recoverPasswordAsync,
    confirmEmailAsync,
    changeEmailAsync,
    deleteMyAccountAsync
}
