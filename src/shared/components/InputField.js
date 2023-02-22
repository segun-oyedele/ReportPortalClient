import PropTypes from 'prop-types';

const stylesDefault = "relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm";

export const InputField = ({ inputLabel, index, inputName, placeholderText, inputType, inputChange, inputValue, inputStyle = '', children = null, inputError, isDisabled }) => {
  return (
    <>
      <div className="relative">
        { inputLabel.length > 0 && <label htmlFor={inputName} className="inline-block mb-2 ml-4 form__label">{inputLabel}</label> }
        <input
          id={inputName}
          autoComplete="off"
          name={inputName}
          type={inputType}
          onChange={(e) => inputChange(e, index)}
          value={inputValue}
          className={`${stylesDefault} ${inputStyle}`}
          placeholder={placeholderText}
          disabled={isDisabled}
        />
        {children}
      </div>
      { !!inputError && !!inputValue.length && <span className="text-xs text-red-500 raleway-b">{inputError}</span> }
    </>
  );
};

InputField.propTypes = {
  placeholderText: PropTypes.string.isRequired,
  inputLabel     : PropTypes.string.isRequired,
  inputValue     : PropTypes.string.isRequired,
  inputError     : PropTypes.string.isRequired,
  inputName      : PropTypes.string.isRequired,
  inputType      : PropTypes.string.isRequired,
  index          : PropTypes.number,
  inputStyle     : PropTypes.string,
  inputChange    : PropTypes.func,
  isPasswordIcon : PropTypes.bool,
  isDisabled     : PropTypes.bool,
  children       : PropTypes.node
};