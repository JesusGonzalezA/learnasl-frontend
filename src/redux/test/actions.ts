import { createAsyncThunk } from '@reduxjs/toolkit'
import * as TestApi from '../../api/test'
import { ErrorResponse, TestResponse } from '../../models/responses'
import { PersistenceService } from '../../services/persistenceService'
import { TestGet } from '../../models/test/testGet';

const getTestAsync = createAsyncThunk<
    TestResponse, 
    TestGet, 
    {
        rejectValue: ErrorResponse
    }>('test/getTest', async(testGet, thunkApi) => {
        const persistenceService = new PersistenceService()
        persistenceService.delete('currentTest')
        const res = await TestApi.getTest(testGet)

        if (!res.ok)
        {
            let errors = []

            // Auth error
            if (res.status === 401)
                errors = ['Your session has expired. Please login again']
            // Other error
            else {
                errors = ['Something went wrong']
            }
            
            return thunkApi.rejectWithValue({
                errors
            } as ErrorResponse) 
        }

        const data = await res.json()
        persistenceService.set('currentTest', {
            test: data,
            page: 1,
            state: 'success'
        })

        return {
            data
        } as TestResponse
    }
)

export {
    getTestAsync
}