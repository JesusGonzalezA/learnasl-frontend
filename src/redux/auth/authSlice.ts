import { AnyAction, createSlice, ThunkAction } from '@reduxjs/toolkit'
import { User } from '../../models/auth'
import * as AuthActions from './actions'
import { PersistenceService } from '../../services/persistenceService'
import { dashboardSlice } from '../dashboard/dashboardSlice'

export interface AuthState {
  user: User,
  status: 'idle' | 'loading' | 'failed',
  errors: string[],
  messages: {
    info: string[]
    success: string[]
  }
}

const invalidUser : User = {
    email: '',
    id: '',
    token: undefined
}

export const initialState: AuthState = {
  user: new PersistenceService().get('user') ?? invalidUser,
  status: 'idle',
  errors: [],
  messages: {
    info: [],
    success: []
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = invalidUser
      state.status = 'idle'
    },
    clearMessages: state => {
      state.messages = { info: [], success: [] }
      state.status = 'idle'
    },
    clearErrors: state => {
      state.errors = []
      state.status = 'idle'
    },
    clearError: (state, action) => {
      state.errors = state.errors.filter(er => er !== action.payload)
      state.status = 'idle'
    },
    clearInfoMessage: (state, action) => {
      state.messages.info = state.messages.info.filter(me => me !== action.payload)
      state.status = 'idle'
    },
    clearSuccessMessage: (state, action) => {
      state.messages.success = state.messages.success.filter(me => me !== action.payload)
      state.status = 'idle'
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(AuthActions.loginAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(AuthActions.loginAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.user = {
            email: action.payload.data.email,
            token: action.payload.data.token,
            id: action.payload.data.id
        }
        state.errors = []
      })
      .addCase(AuthActions.loginAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.user = invalidUser
        state.errors = (action.payload) ? action.payload.errors : ['Something went wrong']
      })

      //Register
      .addCase(AuthActions.registerAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(AuthActions.registerAsync.fulfilled, (state) => {
        state.status = 'idle'
        state.messages.info = ['Review your mail box to confirm your registration']
      })
      .addCase(AuthActions.registerAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.user = invalidUser
        state.errors = (action.payload) ? action.payload.errors : ['Something went wrong']
      })

      // Confirm email - start
      .addCase(AuthActions.resendConfirmationEmailAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(AuthActions.resendConfirmationEmailAsync.fulfilled, (state) => {
        state.status = 'idle'
        state.messages.info = ['Review your mail box to confirm your registration']
      })
      .addCase(AuthActions.resendConfirmationEmailAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.errors = (action.payload) ? action.payload.errors : ['Something went wrong']
      })

      // Confirm email
      .addCase(AuthActions.confirmEmailAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(AuthActions.confirmEmailAsync.fulfilled, (state) => {
        state.status = 'idle'
        state.messages.success = ['Email confirmed. You can now sign in the application']
      })
      .addCase(AuthActions.confirmEmailAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.errors = (action.payload) ? action.payload.errors : ['Something went wrong']
      })

      // Change password - start
      .addCase(AuthActions.startChangePasswordAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(AuthActions.startChangePasswordAsync.fulfilled, (state) => {
        state.status = 'idle'
        state.messages.info = ['Review your mail box to recover your password']
      })
      .addCase(AuthActions.startChangePasswordAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.errors = (action.payload) ? action.payload.errors : ['Something went wrong']
      })

      // Change password
      .addCase(AuthActions.changePasswordAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(AuthActions.changePasswordAsync.fulfilled, (state) => {
        state.status = 'idle'
        state.messages.success = ['Password was changed successfully']
      })
      .addCase(AuthActions.changePasswordAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.errors = (action.payload) ? action.payload.errors : ['Something went wrong']
      })

      // Change email
      .addCase(AuthActions.changeEmailAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(AuthActions.changeEmailAsync.fulfilled, (state) => {
        state.status = 'idle'
        state.messages.success = ['Email was changed successfully, check your inbox']
      })
      .addCase(AuthActions.changeEmailAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.errors = (action.payload) ? action.payload.errors : ['Something went wrong']
      })
      
      // Delete my account
      .addCase(AuthActions.deleteMyAccountAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(AuthActions.deleteMyAccountAsync.fulfilled, (state) => {
        state.status = 'idle'
        state.messages.success = ['We hope to see you again']
      })
      .addCase(AuthActions.deleteMyAccountAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.errors = (action.payload) ? action.payload.errors : ['Something went wrong']
      })
  }
})

export const thunkChangeEmail = (email : string): ThunkAction<void, unknown, unknown, AnyAction> => {
  return (dispatch, getState) => {
    dispatch(AuthActions.changeEmailAsync(email))
      .finally(() => {
        const state : any = getState()
        dispatch(dashboardSlice.actions.setErrors(state.auth?.errors))
      })
  }
}

export const thunkDeleteMyAccount = (): ThunkAction<void, unknown, unknown, AnyAction> => {
  return (dispatch, getState) => {
    dispatch(AuthActions.deleteMyAccountAsync())
      .finally(() => {
        const state : any = getState()
        dispatch(dashboardSlice.actions.setErrors(state.auth?.errors))
      })
  }
}

export const thunkLogout = (): ThunkAction<void, unknown, unknown, AnyAction> => {
  return dispatch => {
    new PersistenceService().clear()
    dispatch(authSlice.actions.logout())
    dispatch(dashboardSlice.actions.clearAll())
  }
}

export const {  
  clearErrors, 
  clearMessages,
  clearError,
  clearInfoMessage,
  clearSuccessMessage
} = authSlice.actions
export default authSlice.reducer