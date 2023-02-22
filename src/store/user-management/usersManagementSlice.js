import { createSlice } from '@reduxjs/toolkit';
import { getUsers } from './';

const initialState = {
  activeUsers: null,
  currentUsersPage: 1,
  displayedUsers: [],
  error: null,
  isLoading: false,
  openUserDeleteForm: false,
  openUserForm: false,
  userToDelete: null,
  users: [],
  usersPerPage: 10
}

export const usersManagementSlice = createSlice({
  name: 'usersManagement',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
      state.displayedUsers = action.payload;
    },
    setOpenUserForm: (state, action) => {
      state.openUserForm = action.payload;
    },
    setOpenUserDeleteForm: (state, action) => {
      state.openUserDeleteForm = action.payload;
    },
    setCurrentUsersPage: (state, action) => {
      state.currentUsersPage = action.payload;
    },
    setActiveUser: (state, action) => {
      state.activeUser = action.payload ? action.payload : null;
    },
    setUserToDelete: (state, action) => {
      state.userToDelete = action.payload ? action.payload : null;
    },
    editUser: (state, action) => {
      const user = state.users.find(user => user.portal_user_id === action.payload.portal_user_id);
      const userDisplayed = state.displayedUsers.find(user => user.portal_user_id === action.payload.portal_user_id);

      user.portal_user_type_id = action.payload.portal_user_type_id;
      userDisplayed.portal_user_type_id = action.payload.portal_user_type_id;
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.portal_user_id !== action.payload);
    },
    displayAdmins: (state) => {
      state.displayedUsers = state.users.filter(user => user.portal_user_type_id === 1);
    },
    displayUsers: (state) => {
      state.displayedUsers = state.users.filter(user => user.portal_user_type_id === 2);
    },
    displayAll: (state) => {
      state.displayedUsers = state.users;
    }
  },
})
export const { setOpenUserForm, setOpenUserDeleteForm, setCurrentUsersPage, setActiveUser, setUserToDelete, editUser, deleteUser, groupToDelete, displayAdmins, displayUsers, displayAll, setUsers } = usersManagementSlice.actions
export default usersManagementSlice.reducer