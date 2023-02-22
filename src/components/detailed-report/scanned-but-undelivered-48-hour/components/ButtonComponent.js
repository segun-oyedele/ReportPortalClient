import PropTypes from 'prop-types';

const btnDefaultColors = 'bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-600 active:bg-indigo-600';
const labelDefaultColors = 'text-white';
const btnDefaultStyles = 'rounded-lg';
const btnDefaultSpacing = 'px-4 py-2.5';

export const ButtonComponent = ({ children, onClick, btnType, btnColors, btnStyles, btnLabel, labelStyles, labelColors, buttonSpacing, iconOnRight }) => {
  return (
    <button
      className={`btn btn_icon focus:outline-none focus:ring-0 active:shadow-lg transition duration-300 ease-in-out flex items-center ${ btnStyles || btnDefaultStyles } ${ btnColors || btnDefaultColors } ${ buttonSpacing || btnDefaultSpacing }`}
      type={ btnType || 'button' }
      onClick={ onClick }
    >
      { !iconOnRight && children }

      { btnLabel && <span className={`font-medium tracking-wide ${ labelColors || labelDefaultColors } ${ labelStyles || '' }`}>{ btnLabel }</span> }
    
      { iconOnRight && children }
    </button>
  );
};

ButtonComponent.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  btnColors: PropTypes.string,
  btnStyles: PropTypes.string,
  btnLabel: PropTypes.string,
  labelStyles: PropTypes.string,
  labelColors: PropTypes.string
};
