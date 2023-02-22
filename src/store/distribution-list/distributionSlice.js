import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeGroup: null,
  currentGroupPage: 1,
  groups: [],
  groupsPerPage: 10,
  groupToDelete: null,
  openGroupDeleteForm: false,
  openGroupForm: false,
}

export const distributionSlice = createSlice({
  name: 'distributionList',
  initialState,
  reducers: {
    setDistributionList: (state, action) => {
      const filterDist = action.payload.reverse().filter(distribution => distribution.active === 1);
      state.groups = filterDist;
    },
    setOpenGroupForm: (state, action) => {
      state.openGroupForm = action.payload;
    },
    setOpenGroupDeleteForm: (state, action) => {
      state.openGroupDeleteForm = action.payload;
    },
    setCurrentGroupPage: (state, action) => {
      state.currentGroupPage = action.payload;
    },
    setActiveGroup: (state, action) => {
      state.activeGroup = action.payload ? action.payload : null;
    },
    setGroupToDelete: (state, action) => {
      state.groupToDelete = action.payload ? action.payload : null;
    },
    addGroup: (state, action) => {
      state.groups = action.payload;
    },
    editGroup: (state, action) => {
      const group = state.groups.find(group => group.portal_distribution_id === action.payload.portal_distribution_id);
      if (group) {
        group.active = action.payload.active;
        group.portal_distribution_id = action.payload.portal_distribution_id;
        group.distribution_name = action.payload.distribution_name;
        group.email = action.payload.email;
      }
    },
    deleteGroup: (state, action) => {
      state.groups = state.groups.filter(group => group.portal_distribution_id !== action.payload);
    }
  },
})
export const { setDistributionList, setOpenGroupForm, setOpenGroupDeleteForm, setCurrentGroupPage, setActiveGroup, setGroupToDelete, addGroup, editGroup, deleteGroup, groupToDelete } = distributionSlice.actions
export default distributionSlice.reducer