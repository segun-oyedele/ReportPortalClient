import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeReport: [],
  currentPage: 1,
  itemsPerPage: 50,
  terminals: [],
  loadingTerminals: false,
}

export const detailedReportSlice = createSlice({
  name: 'detailedReport',
  initialState,
  reducers: {
    setActiveReport: (state, action) => {
      state.activeReport = action.payload
    },
    setCurrentItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload
    },
    setCurrentItemsPage: (state, action) => {
      state.currentPage = action.payload
    },
    setLoadingTerminals: (state, action) => {
      state.loadingTerminals = action.payload
    },
    setTerminals: (state, action) => {
      const sortedTerminalsByName = action.payload.sort((a, b) => {
        if (a.terminal_name < b.terminal_name) {
          return -1;
        }
        if (a.terminal_name > b.terminal_name) {
          return 1;
        }
        return 0;
      });
      state.terminals = sortedTerminalsByName.map(terminal => {
        return {
          ...terminal,
          selected: false
        }
      })
    }
  },
})
export const { setActiveReport, setCurrentItemsPerPage, setLoadingTerminals, setCurrentItemsPage, setTerminals } = detailedReportSlice.actions
export default detailedReportSlice.reducer