import { createSlice, ThunkAction, AnyAction } from '@reduxjs/toolkit';
import { Difficulty, Test, TestType } from '../../models/test'
import * as TestActions from './actions'
import { PersistenceService } from '../../services/persistenceService';

interface Filter {
  pageSize: number,
  pageNumber: number,
  type?: TestType,
  difficulty?: Difficulty,
  fromDate?: string,
  toDate?: string
}

export interface TestState {
  totalTests: number,
  filters: {
    recent: Filter
  },
  currentTest: {
    state: 'loading' | 'error' | 'idle' | 'success',
    test?: Test,
    errors: string[],
    page: number
  }
}

export const initialState: TestState = {
  totalTests: 10,
  filters: {
    recent: {
      pageSize: 10,
      pageNumber: 0
    }
  },
  currentTest: {
    ...new PersistenceService().get('currentTest'),
    errors: []
  } ?? {
    state: 'idle',
    errors: [],
    page: 1
  }
}

export const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setRecentPageSize: (state, action) => {
      state.filters.recent.pageSize = action.payload
    },
    setRecentPageNumber: (state, action) => {
      state.filters.recent.pageNumber = action.payload
    },
    setRecentFilter: (state, action) => {
      state.filters.recent = action.payload
    },
    setTotalTests: (state, action) => {
      state.totalTests = action.payload
    },
    deleteCurrentTest: (state) => {
      state.currentTest.state = 'idle'
      state.currentTest.test = undefined
      state.currentTest.errors = []
      state.currentTest.page = 1
    },
    setPage: (state, action) => {
      state.currentTest.page = action.payload
    },
    setCurrentTest: (state, action) => {
      state.currentTest.test = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      // Get test
      .addCase(TestActions.getTestAsync.pending, (state) => {
        state.currentTest.state = 'loading'
        state.currentTest.errors = []
        state.currentTest.test = undefined
      })
      .addCase(TestActions.getTestAsync.fulfilled, (state, action) => {
        state.currentTest.state = 'success'
        state.currentTest.test = action.payload.data
        state.currentTest.errors = []
      })
      .addCase(TestActions.getTestAsync.rejected, (state, action) => {
        state.currentTest.state = 'error'
        state.currentTest.errors =  (action.payload) ? action.payload.errors : ['Something went wrong']
        state.currentTest.test = undefined
      })
  }
})

export const thunkSetPage = (pageNumber: number): ThunkAction<void, unknown, unknown, AnyAction> => {
  return dispatch => {
    const persistenceService = new PersistenceService()
    const currentTest = persistenceService.get('currentTest')
    persistenceService.set('currentTest', {
      ...currentTest,
      page: pageNumber
    })
    dispatch(testSlice.actions.setPage(pageNumber))
  }
}

export const thunkDeleteCurrentTest = (): ThunkAction<void, unknown, unknown, AnyAction> => {
  return dispatch => {
    const persistenceService = new PersistenceService()
    persistenceService.delete('currentTest')
    dispatch(testSlice.actions.deleteCurrentTest())
  }
}

export const thunkSetCurrentTest = (test : Test): ThunkAction<void, unknown, unknown, AnyAction> => {
  return dispatch => {
    const persistenceService = new PersistenceService()
    const currentTestInPersistence = persistenceService.get('currentTest')
    persistenceService.set('currentTest', {
      state: currentTestInPersistence.state,
      page: currentTestInPersistence.page,
      test
    })
    dispatch(testSlice.actions.setCurrentTest(test))
  }
}

export const {
  setRecentPageSize,
  setRecentPageNumber,
  setRecentFilter,
  setTotalTests,
  setPage
} = testSlice.actions
export default testSlice.reducer