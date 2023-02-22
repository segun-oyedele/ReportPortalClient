import { useFetch, useFetchWithQuery } from '@/shared/hooks';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setDistributionList } from './distributionSlice';

/* GET DISTRIBUTION LIST */

export const getDistributionList = createAsyncThunk('distributionList/getDistributionList', async (_, { dispatch }) => {

  const response = await useFetchWithQuery('/distribution');
  const body = await response.json();

  if(body.success) {
    dispatch(setDistributionList(body.data));
    return true;
  } else {
    return false;
  }

});

/* ADD DISTRIBUTION */

export const addDistribution = createAsyncThunk('distributionList/addDistribution', async (distributionData, { dispatch }) => {

  const body = {
    portal_data: { ...distributionData, active: 1 }
  }

  const response = await useFetch('/distribution/add', body, 'POST');
  const { data, success } = await response.json();

  if(success) {
    dispatch(setDistributionList(data));
    return true;
  } else {
    return false;
  }
});

/* UPDATE DISTRIBUTION */

export const updateDistribution = createAsyncThunk('distributionList/updateDistribution', async (distributionData, { dispatch }) => {

  const body = {
    portal_data: { ...distributionData }
  }

  const response = await useFetch('/distribution/update/', body, 'POST');
  const { data, success } = await response.json();
  
  if(success) {
    dispatch(setDistributionList(data));
    return true;
  } else {
    return false;
  }
});