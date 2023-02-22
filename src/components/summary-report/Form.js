import PropTypes from 'prop-types';
import 'react-clock/dist/Clock.css';
import 'react-time-picker/dist/TimePicker.css';
import TimePicker from 'react-time-picker/dist/entry.nostyle';

import { ButtonComponent, InputField, PageDescription, PageTitle } from '@/shared/components';
import { useAppSelector } from '@/store/hooks';
import { InputSelect, useForm, InputReport } from './';

const initialForm = {
  distribution_id: null,
  report_time: "",
  report_frequency: ""
};

const weekDays = [
  { day: "M", label: "Monday" },
  { day: "T", label: "Tuesday" },
  { day: "W", label: "Wednesday" },
  { day: "TH", label: "Thursday" },
  { day: "F", label: "Friday" },
  { day: "S", label: "Saturday" },
  { day: "SU", label: "Sunday" }
];


export const Form = ({ handleCloseForm }) => {

  const { activeGroup, addReport } = useAppSelector(state => state.summaryReport);
  const { formValues, handleEmailChange, handleReportFrecuency, emailError, reportNameError, handleSaveGroup, handleChangeDistribution, distributions, distributionSelected, onChangeReportTime,handleChangeReport, reportSelected, reports } = useForm(initialForm);
  const { email, report_name, report_frequency, report_time } = formValues;
  const showButton = !emailError && !!email.length && !reportNameError && !!report_name.length;

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-slate-200/50">
      <div className="w-full max-w-md bg-white shadow form__container">

        <PageTitle
          title={!!activeGroup ? 'Edit Details' : "Add New Group"}
          stylesClass="text-center raleway-b text-3xl mb-2"
        />

        <PageDescription
          title={!!activeGroup ? 'You can edit details' : "Add a group to the distribution list"}
          stylesClass="text-center w-72 md:w-80 auth__page-description mx-auto mb-8"
        />

        <form
          className="mt-8 space-y-6"
          onSubmit={handleSaveGroup}
        >
          <div className="-space-y-px rounded-md">

            <InputSelect
              handleChangeDistribution={handleChangeDistribution}
              distributionSelected={distributionSelected}
              distributions={distributions}
            />
            <div className="flex flex-col pt-4">
              <InputField
                inputLabel='Email Addresss'
                inputName='email'
                inputType='email'
                placeholderText='georgevivian@gmail.com'
                inputChange={handleEmailChange}
                inputValue={email}
                inputStyle='form__input mt-2'
                inputError={emailError}
                isDisabled
              />
              {!!emailError && <span className="text-xs text-red-500 raleway-b">{emailError}</span>}
            </div>
            {addReport && 
              <InputReport
                handleChangeReport={handleChangeReport}
                reportSelected={reportSelected}
                reports={reports}
              />
            }

            
            <div className="py-4">
              <label className="inline-block mb-2 ml-4 form__label">Report Frecuency</label>
              <div className="grid justify-between grid-cols-3 gap-5 mt-2 text-center justify-items-center">
                { weekDays.map(({ day, label }, index) => (
                  <div
                    key={`day-${index}`}
                    onClick={() => handleReportFrecuency(day)}
                    className={`w-full px-4 py-2 mb-2 rounded-md cursor-pointer ${report_frequency.includes(day) ? 'active_day font-bold' : 'bg-gray-100'}`}
                  >
                    { label }
                  </div>
                ))
                }
              </div>
            </div>
            
            <div className="py-4">
              <label className="inline-block mb-2 ml-4 form__label">Execution Time</label>
              <div className="grid mt-2 text-center">
                <TimePicker onChange={onChangeReportTime} value={report_time} />
              </div>
            </div>

          </div>

          <div className="grid grid-cols-[1fr_1fr] lg:grid-cols-[208px_208px] gap-4 mt-4 form__button-container">
            {showButton
              ?
              <ButtonComponent
                onClick={handleSaveGroup}
                btnType='submit'
                btnColors='relative flex justify-center w-full px-4 py-2 text-lg text-white ease-in-out border border-transparent rounded-md group focus:outline-none primary__button form__button transition-opacity ease-in-out duration-300 hover:opacity-60'
                btnLabel={!!activeGroup ? 'Save' : 'Create'}
                labelColors='raleway-b'
              />
              :
              <ButtonComponent
                onClick={() => null}
                btnColors='relative flex justify-center w-full px-4 py-2 text-lg text-white ease-in-out border border-transparent rounded-md cursor-default opacity-60 group focus:outline-none primary__button form__button'
                btnLabel={!!activeGroup ? 'Save' : 'Create'}
                labelColors='raleway-b'
              />
            }
            <ButtonComponent
              onClick={handleCloseForm}
              btnColors='relative flex justify-center w-full px-4 py-2 text-lg text-white transition-opacity duration-300 ease-in-out bg-white border border-transparent rounded-mdfocus:outline-none form__button second__button hover:opacity-60'
              btnLabel='Cancel'
              labelColors='raleway-b'
            />
          </div>

        </form>
      </div>
    </div>
  );
};

Form.propTypes = {
  handleCloseForm: PropTypes.func.isRequired
};