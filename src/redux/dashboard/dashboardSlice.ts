import { createSlice } from '@reduxjs/toolkit'

export interface DashboardState {
  errors: string[],
  messages: {
    info: string[]
    success: string[]
  }
}

export const initialState: DashboardState = {
  errors: [],
  messages: {
    info: [],
    success: []
  }
}

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setErrors: (state, action) => {
      state.errors = action.payload
    },
    setInfoMessages: (state, action) => {
      state.messages.info = action.payload
    },
    setSuccessMessages: (state, action) => {
      state.messages.success = action.payload
    },
    clearMessages: state => {
      state.messages = { info: [], success: [] }
    },
    clearErrors: state => {
      state.errors = []
    },
    clearError: (state, action) => {
      state.errors = state.errors.filter(er => er !== action.payload)
    },
    clearInfoMessage: (state, action) => {
      state.messages.info = state.messages.info.filter(me => me !== action.payload)
    },
    clearSuccessMessage: (state, action) => {
      state.messages.success = state.messages.success.filter(me => me !== action.payload)
    },
    clearAll: (state) => {
      state.errors = []
      state.messages.info = []
      state.messages.success = []
    }
  }
})

export const {
  clearAll,
  clearErrors, 
  clearMessages,
  clearError,
  clearInfoMessage,
  clearSuccessMessage,
  setErrors,
  setInfoMessages,
  setSuccessMessages
} = dashboardSlice.actions
export default dashboardSlice.reducer