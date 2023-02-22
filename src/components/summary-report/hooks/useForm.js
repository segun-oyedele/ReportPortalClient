import { useState } from 'react';
import PropTypes from 'prop-types';

import {  addSummaryReport, setActiveGroup, setOpenGroupForm, updateSummaryReport } from '@/store/summary-report';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { alertPopup } from '@/shared/helpers';
import { BASE_URL } from 'src/constants';

const initialErrorValues = {
  emailError: '',
  reportNameError: ''
}

const initialReportTime = [];

const newReport = { distribution_name: "Select a distribution" };
const defaultReport = { report_name: "Select a Report" };

export const useForm = (initialState = { distribution_id: null, report_time: '', report_frequency: "" }) => {

  const dispatch = useAppDispatch();
  const { activeGroup, distributions, reports, addReport } = useAppSelector(state => state.summaryReport);
  const currentDistribution = distributions.find(distribution => distribution.portal_distribution_id === activeGroup?.distribution_id);
  const [distributionSelected, setDistributionSelected] = useState(currentDistribution || newReport);
  const [reportSelected, setReportSelected] = useState(defaultReport);
  const { report_time, distribution_id, report_frequency, report_name, email } = activeGroup || initialState;
  const [values, setValues] = useState({
    ...activeGroup,
    report_frequency: report_frequency.length > 0 ? report_frequency.split(',') : initialReportTime,
    distribution_id: distribution_id || null,
    report_time: report_time || '',
    report_name: report_name || '',
    email: email || ''
  });

  const [formErrors, setFormErrors] = useState(initialErrorValues);
  const { emailError, reportNameError } = formErrors;

  const reset = () => {
    setValues(initialState);
    setFormErrors(initialErrorValues);
  }

  const handleChangeDistribution = (option) => {
    const { distribution_name, email, portal_distribution_id } = option;

    setValues({
      ...values,
      email: email,
      report_name: distribution_name,
      distribution_id: portal_distribution_id
    });
    setDistributionSelected(option);
  }

  const handleChangeReport = (option) => {
    const { active, portal_summary_report_type_id: report_type_id } = option;

    setValues({
      ...values,
      report_type_id: report_type_id,
      active: active,
    });
    setReportSelected(option);
  }



  const handleReportFrecuency = (report) => {
    const { report_frequency } = values;
    const index = report_frequency.indexOf(report);

    if (index > -1) {
      report_frequency.splice(index, 1);
    } else {
      report_frequency.push(report);
    }

    setValues({
      ...values,
      report_frequency
    });
  }

  const onChangeReportTime = (report_time) => {
    setValues({
      ...values,
      report_time
    })
  }

  const handleSaveGroup = async (e) => {
    e.preventDefault();
    if(addReport) {
      const { report_type_id, distribution_id,report_time, active, report_frequency } = values;
      const finalReportFrecuency = report_frequency.join(',');

      const data = { portal_data: {
        report_type_id: `${report_type_id}`,
        distribution_id: `${distribution_id}`,
        report_time: report_time,
        report_frequency: finalReportFrecuency,
        report_url: `${BASE_URL}/summary/send-report?distributionid=${distribution_id}&reportid=${report_type_id}`,
        active: active,
      }
      }
    
      const payload  = await dispatch(addSummaryReport(data));
      if(payload.payload) {
        alertPopup('Summary Report added successfully');
      } else {
        alertPopup('Summary Report could not be added', 'error');
      }
    
      reset();
      dispatch(setOpenGroupForm(false));
    } else {
      const { email, report_name, report_frequency, ...rest } = values;
      
      const finalReportFrecuency = report_frequency.join(',');
      const finalGroup = { report_frequency: finalReportFrecuency, ...rest };
      
      const { payload } = await dispatch(updateSummaryReport(finalGroup));
    
      if(payload) {
        alertPopup('Summary Report added successfully');
      } else {
        alertPopup('Summary Report could not be added', 'error');
      }
    
      reset();
      dispatch(setOpenGroupForm(false));
      dispatch(setActiveGroup());
    }
  }

  return { formValues: values, reset, emailError, reportNameError, handleReportFrecuency, handleSaveGroup, setFormErrors, distributions, handleChangeDistribution, distributionSelected, onChangeReportTime, handleChangeReport, reportSelected, reports };

};

useForm.propTypes = {
  initialState: PropTypes.object
};