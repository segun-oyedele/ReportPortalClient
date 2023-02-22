import PropTypes from 'prop-types';

import { ButtonComponent, InputField, PageDescription, PageTitle } from '@/shared/components';
import { InputSelectField } from '@/shared/components/InputSelectField';
import { InputActive, useForm } from './';

export const Form = ({ handleCloseForm }) => {

  const { formValues, handleUserTypeChange, handleSaveUser, selected, options, handleIsActive } = useForm();
  const { first_name, last_name, email, active } = formValues;

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-slate-200/50">
      <div className="w-full max-w-md bg-white shadow form__container">

        <PageTitle
          title="Edit User Details"
          stylesClass="text-center raleway-b text-3xl mb-2"
        />

        <PageDescription
          title="You can edit user type"
          stylesClass="text-center w-72 md:w-80 auth__page-description mx-auto mb-8"
        />

        <form
          className="mt-8 space-y-6"
          onSubmit={handleSaveUser}
        >
          <div className="-space-y-px rounded-md">
            <InputField
              inputLabel='First Name'
              inputName='firstname'
              placeholderText='First Name'
              inputType='text'
              inputChange={() => { }}
              inputValue={first_name}
              inputStyle='form__input mb-2 mt-2 opacity-50'
              inputError={''}
              isDisabled={true}
            />

            <InputField
              inputLabel='Last Name'
              inputName='lastname'
              placeholderText='Last Name'
              inputType='text'
              inputChange={() => { }}
              inputValue={last_name}
              inputStyle='form__input mb-2 mt-2 opacity-50'
              inputError={''}
              isDisabled={true}
            />

            <InputField
              inputLabel='Email Addresss'
              inputName='email'
              inputType='email'
              placeholderText='georgevivian@gmail.com'
              inputChange={() => { }}
              inputValue={email}
              inputStyle='form__input mb-2 mt-2 opacity-50'
              inputError={''}
              isDisabled={true}
            />

            <InputSelectField
              handleUserTypeChange={handleUserTypeChange}
              labelText='User Type'
              selected={selected}
              options={options}
            />

          </div>

          <div className="flex items-center justify-between gap-3 pt-4 partner__form-switch">
            <label className="inline-block mb-2 ml-4 form__label">Active</label>
            <InputActive
              isActive={active}
              handleIsActive={handleIsActive}
            />
          </div>

          <div className="grid grid-cols-[1fr_1fr] lg:grid-cols-[208px_208px] gap-4 mt-4 form__button-container">
            <ButtonComponent
              btnType='submit'
              btnColors='relative flex justify-center w-full px-4 py-2 text-lg text-white ease-in-out border border-transparent rounded-md group focus:outline-none primary__button form__button transition-opacity ease-in-out duration-300 hover:opacity-60'
              btnLabel='Save'
              labelColors='raleway-b'
            />
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