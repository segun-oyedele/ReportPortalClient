import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeGroup: null,
  currentGroupPage: 1,
  groupToDelete: null,
  groups: [],
  groupsPerPage: 10,
  openGroupDeleteForm: false,
  openGroupForm: false,
  reports: [],
  distributions: [],
  addReport: false,
};

export const summaryReportSlice = createSlice({
  name: "summaryReport",
  initialState,
  reducers: {
    setSummaryReport: (state, action) => {
      const summaryFilter = action.payload.filter(
        (summary) => summary.active === 1
      );
      state.groups = summaryFilter;
    },
    setDistributions: (state, action) => {
      state.distributions = action.payload.reverse();
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
    setAddReport: (state, action) => {
      state.addReport = action.payload;
    },
    setActiveGroup: (state, action) => {
      state.activeGroup = action.payload ? action.payload : null;
    },
    setGroupToDelete: (state, action) => {
      state.groupToDelete = action.payload ? action.payload : null;
    },
    updateGroup: (state, action) => {
      const group = state.groups.find(
        (group) =>
          group.portal_summary_report_id ===
          action.payload.portal_summary_report_id
      );
      if (group) {
        group.active = action.payload.active;
        group.date_modified = action.payload.date_modified;
        group.distribution_id = action.payload.distribution_id;
        group.portal_summary_report_id =
          action.payload.portal_summary_report_id;
        group.report_frequency = action.payload.report_frequency;
        group.report_time = action.payload.report_time;
        group.report_type_id = action.payload.report_type_id;
        group.report_url = action.payload.report_url;
      }
    },
    addReportType: (state, action) => {
      const report = state.reports.find(
        (report) =>
          report.portal_summary_report_type_id ===
          action.payload.portal_summary_report_type_id
      );
      if (report) {
        report.portal_summary_report_type_id =
          action.payload.portal_summary_report_type_id;
        report.date_modified = action.payload.date_modified;
        report.report_name = action.payload.report_name;
        report.active = action.payload.active;
      } else {
        state.reports = action.payload;
      }
    },
    deleteGroup: (state, action) => {
      state.groups = state.groups.filter(
        (group) => group.portal_summary_report_id !== action.payload
      );
    },
  },
});
export const {
  setSummaryReport,
  setDistributions,
  setOpenGroupForm,
  setOpenGroupDeleteForm,
  setCurrentGroupPage,
  setActiveGroup,
  setGroupToDelete,
  updateGroup,
  addReportType,
  deleteGroup,
  groupToDelete,
  setAddReport,
} = summaryReportSlice.actions;
export default summaryReportSlice.reducer;
