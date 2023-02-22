import PropTypes from 'prop-types'

export const Button = ({buttonText,disabled}) => {
  return (
    <button
      type="submit"
      className={`relative flex justify-center w-full px-4 py-2 text-lg text-white transition-opacity duration-300 ease-in-out border border-transparent rounded-md  primary-blue raleway-b group focus:outline-none auth__button hover:opacity-60 ${disabled ? `opacity-60 cursor-default` : `opacity-100 cursor-pointer`}`}
      disabled={disabled}
    >
      {buttonText}
    </button>
  )
}

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  disabled: PropTypes.bool
}