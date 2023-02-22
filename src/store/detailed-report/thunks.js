import { createAsyncThunk } from '@reduxjs/toolkit';
import moment from "moment/moment";
import { setActiveReport, setTerminals, setLoadingTerminals } from './detailedReportSlice';
import { useFetch, useFetchWithQuery } from '@/shared/hooks';

/* GET DETAILED SCANNED BUT UNDELIVERED 48 HOUR COUNT BY AGING */

const defaultBodyOne = {
  dc_segment: null,
  aging_threshold: moment(new Date()).format("YYYY-MM-DD"),
  account_number: null
}

export const getDetailedScannedButUndelivered48HourCountByAging = createAsyncThunk("detailedReport/getDetailedScannedButUndelivered48HourCountByAging", async (body = defaultBodyOne, { dispatch }) => {

  dispatch(setLoadingTerminals(true));

  const response = await useFetch("/detailed/scanned-but-undelivered-48h-count-by-aging", body, "POST");
  const { data, success } = await response.json();

  if (success) {
    dispatch(setActiveReport(data));
    dispatch(setLoadingTerminals(false));
  } else {
    dispatch(setLoadingTerminals(false));
  }

});

/* GET DETAILED ORDER NOT AAIGNED TO DRIVERS WITH NO SCAN 24 COUNT BY AGING */

export const getDetailedOrderNotAssignedToDriversWithNoScan24CountByAging = createAsyncThunk("detailedReport/getDetailedOrderNotAssignedToDriversWithNoScan24CountByAging", async (body = defaultBodyOne, { dispatch }) => {

  dispatch(setLoadingTerminals(true));

  const response = await useFetch("/detailed/orders-not-assigned-to-drivers-with-no-scan-24-count-by-aging", body, "POST");
  const { data, success } = await response.json();

  if (success) {
    dispatch(setActiveReport(data));
    dispatch(setLoadingTerminals(false));
  } else {
    dispatch(setLoadingTerminals(false));
  }

});

/* GET DETAILED DRIVERS OR CONTRACTORS WITH OPEN ORDERS SUMMARY COUNT */

const bodyDefaultOpenOrders = {
  driver_dc: null,
  driver_no: null,
};

export const getDetailedDriversOrContractorsWithOpenOrdersSummaryCount = createAsyncThunk("detailedReport/getDetailedDriversOrContractorsWithOpenOrdersSummaryCount", async (body = bodyDefaultOpenOrders, { dispatch }) => {

  dispatch(setLoadingTerminals(true));

  const response = await useFetch("/detailed/drivers-contractor-with-open-orders-summary-count", body, "POST");
  const { data, success } = await response.json();

  if (success) {
    dispatch(setActiveReport(data));
    dispatch(setLoadingTerminals(false));
  } else {
    dispatch(setLoadingTerminals(false));
  }
});

const bodyDefaultDriverReport = {
  driver_center: null,
  driver_type: null,
  target_date: "2022-10-06",
};

/* GET DRIVER REPORT */

export const getDriverReport = createAsyncThunk("detailedReport/getDriverReport", async (body = bodyDefaultDriverReport, { dispatch }) => {

  dispatch(setLoadingTerminals(true));

  const response = await useFetch("/detailed/get-driver-report", body, "POST");

  const { data, success } = await response.json();

  if (success) {
    dispatch(setActiveReport(data));
    dispatch(setLoadingTerminals(false));
  } else {
    dispatch(setLoadingTerminals(false));
  }
});

/* GET TERMINALS */

export const getTerminals = createAsyncThunk("detailedReport/getTerminals", async (_, { dispatch }) => {

  const response = await useFetchWithQuery("/terminals");
  const { data, success } = await response.json();

  if (success) {
    dispatch(setTerminals(data));
    return true;
  } else {
    return false;
  }
}
);
export const getDCTerminals = createAsyncThunk("detailedReport/getDCTerminals", async (_, { dispatch }) => {

  const response = await useFetchWithQuery("/dc-terminals");
  const { data, success } = await response.json();

  if (success) {
    dispatch(setTerminals(data));
    return true;
  } else {
    return false;
  }
}
);