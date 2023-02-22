import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    active: false
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActive: (state, action) => {
      state.active = action.payload;
    }
  },
})
export const { setActive } = uiSlice.actions
export default uiSlice.reducer