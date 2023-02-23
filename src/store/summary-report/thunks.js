import { useFetch, useFetchWithQuery } from "@/shared/hooks";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setSummaryReport,
  addReportType,
  setDistributions,
} from "./summaryReportSlice";

/* GET SUMMARY REPORT LIST */

export const getSummaryReportlist = createAsyncThunk(
  "summaryReport/getSummaryReportlist",
  async (_, { dispatch }) => {
    const responseDistribution = await useFetchWithQuery("/distribution/");
    const { data } = await responseDistribution.json();
    dispatch(setDistributions(data));

    const response = await useFetchWithQuery("/report/");
    const body = await response.json();

    dispatch(setSummaryReport(body.data));
  }
);

/* GET SUMMARY REPORT TYPE */

export const getSummaryReportType = createAsyncThunk(
  "summaryReport/getSummaryReportType",
  async (_, { dispatch }) => {
    const response = await useFetchWithQuery("/report-type/");
    const body = await response.json();
    if (body.success) {
      dispatch(addReportType(body.data));
      return true;
    } else {
      return false;
    }
  }
);

/* ADD SUMMARY REPORT TYPE */

export const addSummaryReportType = createAsyncThunk(
  "summaryReport/addSummaryReportType",
  async (data, { dispatch }) => {
    const response = await useFetch("/report-type/add/", data, "POST");
    const body = await response.json();

    if (body.success) {
      dispatch(addReportType(body.data));
      return true;
    } else {
      return false;
    }
  }
);

/* ADD SUMMARY REPORT */

export const addSummaryReport = createAsyncThunk(
  "summaryReport/addSummaryReport",
  async (data, { dispatch }) => {
    const response = await useFetch("/report/add/", data, "POST");
    const body = await response.json();

    if (body.success) {
      dispatch(setSummaryReport(body.data));
      return true;
    } else {
      return false;
    }
  }
);

/* UPDATE SUMMARY REPORT */

export const updateSummaryReport = createAsyncThunk(
  "summaryReport/updateSummaryReport",
  async (summaryData, { dispatch }) => {
    const {
      active,
      distribution_id,
      portal_summary_report_id,
      report_frequency,
      report_time,
      report_type_id,
      report_url,
    } = summaryData;
    const body = {
      portal_data: {
        active,
        distribution_id: `${distribution_id}`,
        portal_summary_report_id: `${portal_summary_report_id}`,
        report_frequency,
        report_time,
        report_type_id: `${report_type_id}`,
        report_url,
      },
    };

    const response = await useFetch("/report/update/", body, "POST");
    const { data, success } = await response.json();

    if (success) {
      dispatch(setSummaryReport(data));
      return true;
    } else {
      return false;
    }
  }
);
