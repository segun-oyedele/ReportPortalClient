import { useFetch, useFetchWithQuery } from '@/shared/hooks';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { editUser, setUsers } from './usersManagementSlice';

/* GET USERS */

export const getUsers = createAsyncThunk('usersManagement/getUsers', async (_, { dispatch }) => {

  const response = await useFetchWithQuery('/users');
  const { data } = await response.json();

  dispatch(setUsers(data));
});

/* GET USER BY ID */

export const getUsersById = createAsyncThunk('usersManagement/getUserById', async () => {

  const body = {
    portal_data: {
      portal_portal_user_id: 1
    }
  }

  const response = await useFetch('/user', body, 'POST');
  const { data } = await response.json();
  return data;
});

/* GET USERS TYPE */

export const getUsersType = createAsyncThunk('usersManagement/userType', async () => {

  const response = await useFetchWithQuery('/user-type');
  const { data } = await response.json();
  return data;

});

/* ADD USER TYPE */

export const addUserType = createAsyncThunk('usersManagement/addUserType', async () => {

  const body = {
    user_type: "Test User"
  }

  const response = await useFetch('/user-type/add', body, 'POST');
  const { data } = await response.json();
  return data;
});

/* UPDATE USER TYPE */

export const updateUserType = createAsyncThunk('usersManagement/updateUserType', async () => {

  const body = {
    portal_data: {
      active: 1,
      user_type: "Test User",
      portal_user_type_id: 3
    }
  }

  const response = await useFetch('/user-type/update', body, 'POST');
  const { data } = await response.json();
  return data;
});

/* UPDATE USER DATA */

export const updateUserData = createAsyncThunk('usersManagement/updateUserData', async (userData, { dispatch }) => {

  const body = {
    portal_data: { ...userData }
  }

  const response = await useFetch('/user/update', body, 'POST');
  const data = await response.json();

  if(data.success) {
    dispatch(setUsers(data.data));
    return true;
  } else {
    return false;
  }
});