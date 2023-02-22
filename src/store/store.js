import { configureStore } from '@reduxjs/toolkit';

import usersManagement from './user-management/usersManagementSlice';
import distributionList from './distribution-list/distributionSlice';
import detailedReport from './detailed-report/detailedReportSlice';
import summaryReport from './summary-report/summaryReportSlice';
import sidebar from './sidebar/sidebarSlice';
import user from './user/userSlice';
import ui from './ui/uiSlice';


export let store = null;

export default function getStore(incomingPreloadState) {
  store = configureStore({
    reducer: {
      ui,
      user,
      sidebar,
      distributionList,
      usersManagement,
      summaryReport,
      detailedReport
    },
    preloadedState: incomingPreloadState
  });
  return store;
};