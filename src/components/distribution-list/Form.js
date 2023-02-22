import { ButtonComponent, InputField, PageDescription, PageTitle } from '@/shared/components';
import { useAppSelector } from '@/store/hooks';
import { useForm } from '@/shared/hooks';
import PropTypes from 'prop-types';

const initialForm = {
  groupName: '',
  email: ''
};

export const Form = ({ handleCloseForm }) => {

  const { activeGroup } = useAppSelector(state => state.distributionList);
  const { formValues, handleEmailChange, handleGroupNameChange, emailError, groupNameError, handleSaveGroup } = useForm(initialForm);
  const { email, groupName } = formValues;

  const showButton = !emailError && !!email.length && !groupNameError && !!groupName.length;

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
            <InputField
              inputLabel='Group Name'
              inputName='groupName'
              placeholderText='Support'
              inputType='text'
              inputChange={handleGroupNameChange}
              inputValue={groupName}
              inputStyle='form__input mb-2 mt-2'
              inputError={groupNameError}
            />

            <InputField
              inputLabel='Email Addresss'
              inputName='email'
              inputType='email'
              placeholderText='georgevivian@gmail.com'
              inputChange={handleEmailChange}
              inputValue={email}
              inputStyle='form__input mt-2'
              inputError={emailError}
            />
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