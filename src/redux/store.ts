import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import testReducer from './test/testSlice'
import dashboardReducer from './dashboard/dashboardSlice'

export const store = configureStore({
    reducer: {
      auth: authReducer,
      test: testReducer,
      dashboard: dashboardReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch