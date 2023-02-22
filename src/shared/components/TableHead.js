import PropTypes from 'prop-types';

const trStylesDefault = 'text-sm leading-normal rounded-tr rounded-tl';
const trColorsDefault = 'text-gray-600';

export const TableHead = ({ theadItems, theadTrStyles, theadTrColors, theadTrGridStyles }) => {
  return (
    <thead>
      <tr className={`${theadTrStyles || trStylesDefault} ${theadTrColors || trColorsDefault} ${theadTrGridStyles || ''}`}>
        { theadItems.map(({ header, headerStyles }, index) => (
            <th
              key={header}
              className={`select-none ${headerStyles} raleway-m thead-item text-sm`}
            >
              {index === 0 && <span className="mr-5">#</span>}
              {header}
            </th>
          ))
        }
      </tr>
    </thead>
  );
};

TableHead.propTypes = {
  theadItems: PropTypes.array.isRequired,
  theadTrGridStyles: PropTypes.string,
  theadTrStyles: PropTypes.string,
  theadTrColors: PropTypes.string
};