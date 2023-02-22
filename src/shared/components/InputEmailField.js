import { FormInputError } from '../../components/summary-report';
import PropTypes from 'prop-types';
import { useState } from 'react';

const stylesDefault = "relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm";

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const InputEmailField = ({ inputLabel, index, inputName, placeholderText, inputType, inputChange, inputValue, inputStyle = '', children = null, isDisabled, setFormErrors }) => {
  const [email, setEmail] = useState(inputValue || '');
  const [emailError, setEmailError] = useState({ error: false, errorMessage: '' });

  const handleChange = e => {
    const { value } = e.target;
    setEmail(value);
    if (!e.target.value.match(emailRegex)) {
      setEmailError({ error: true, errorMessage: 'Email is not valid' });
    } else {
      setEmailError({ error: false, errorMessage: '' });
    }
  }

  const handleEmailBlur = (e) => {
    if(emailError.error) {
      setFormErrors(prev => ({ ...prev, emailError: 'All emails must be valid' }));
      return;
    } else {
      setFormErrors(prev => ({ ...prev, emailError: '' }));
    }
    inputChange(e, index);
  }

  return (
    <>
      <div className="relative grid grid-cols-[1fr_32px] gap-5 items-center">
        {inputLabel.length > 0 && <label htmlFor={inputName} className="inline-block mb-2 ml-4 form__label">{inputLabel}</label>}
        <input
          className={`${stylesDefault} ${inputStyle}`}
          onChange={e => handleChange(e)}
          placeholder={placeholderText}
          onBlur={ handleEmailBlur }
          disabled={isDisabled}
          autoComplete="off"
          name={inputName}
          type={inputType}
          id={inputName}
          value={email}
        />
        {children}
      </div>

      {emailError.error && <FormInputError
        errorMessage={emailError.errorMessage}
        error={emailError.error}
      />}
    </>
  );
};

InputEmailField.propTypes = {
  placeholderText: PropTypes.string.isRequired,
  inputLabel     : PropTypes.string.isRequired,
  inputValue     : PropTypes.string.isRequired,
  inputName      : PropTypes.string.isRequired,
  inputType      : PropTypes.string.isRequired,
  inputChange    : PropTypes.func.isRequired,
  setFormErrors  : PropTypes.func.isRequired,
  inputStyle     : PropTypes.string,
  index          : PropTypes.number,
  isPasswordIcon : PropTypes.bool,
  isDisabled     : PropTypes.bool,
  children       : PropTypes.node
};