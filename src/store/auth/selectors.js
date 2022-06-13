export const initialState = {
  isLoggingIn: false
}

export const isLoggingInSelector = state => state.isLoggingIn || initialState.isLoggingIn
