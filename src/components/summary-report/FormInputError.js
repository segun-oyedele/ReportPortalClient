import PropTypes from 'prop-types';

export const FormInputError = ({ errorMessage, error }) => {
  return (
    <span className={`${ error ? 'opacity-100' : 'opacity-0' } font-medium transition-opacity duration-300 mt-2 text-red-600 text-sm`}>{ errorMessage }</span>
  );
};

FormInputError.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired
}