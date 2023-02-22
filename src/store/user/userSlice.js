import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthentication: (state, action) => {
      state.isAuthenticated = action.payload
    },
    clearUser: (state) => {
      state.isAuthenticated = false
    }
  },
})
export const { setAuthentication, clearUser } = userSlice.actions
export default userSlice.reducer