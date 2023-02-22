import PropTypes from 'prop-types';

const trStylesDefault = 'text-sm leading-normal rounded-tr rounded-tl md:h-12';
const trColorsDefault = 'text-gray-600';

export const TableHead = ({ theadItems, theadTrStyles, theadTrColors, theadTrGridStyles, showEnumeration, handleSort }) => {
  return (
    <thead>
      <tr className={`${ theadTrStyles || trStylesDefault } ${ theadTrColors || trColorsDefault } ${ theadTrGridStyles || '' }`}>
        { 
          theadItems.map( ({ label, stylesClasses, selector }, index) => (
            <th
              key={ label }
              className={`select-none ${ stylesClasses } raleway-m thead-item text-sm cursor-pointer`}
              onClick={() => {
                handleSort(selector)
              }}
            >
              { index === 0 && showEnumeration && <span className="mr-5">#</span>}
              { label }
            </th>
          ))
        }
      </tr>
    </thead>
  );
};

TableHead.propTypes = {
  theadItems: PropTypes.arrayOf(PropTypes.shape(
    { 
      label: PropTypes.string.isRequired, 
      stylesClasses: PropTypes.string.isRequired,
      selector: PropTypes.string
    }
  )).isRequired,
  theadTrStyles: PropTypes.string,
  theadTrColors: PropTypes.string,
  theadTrGridStyles: PropTypes.string,
  showEnumeration: PropTypes.bool,
  handleSort: PropTypes.func
};