import { TableBody, TableHead } from '.';

import PropTypes from 'prop-types';

export const Table = ({
    tableStyles,
    theadItems,
    theadTrGridStyles,
    tbodyItems,
    tbodyTrGridStyles,
    theadTrStyles,
    theadTrColors,
    tbodyTrColors,
    tbodyTrStyles
  }) => {
  return (
    <table className={tableStyles}>
      <TableHead
        theadItems={theadItems}
        theadTrStyles={theadTrStyles}
        theadTrColors={theadTrColors}
        theadTrGridStyles={theadTrGridStyles}
      />

      <TableBody
        tbodyItems={tbodyItems}
        tbodyTrColors={tbodyTrColors}
        tbodyTrStyles={tbodyTrStyles}
        tbodyTrGridStyles={tbodyTrGridStyles}
        tableColumns={theadItems}
      />
    </table>
  );
};

Table.propTypes = {
  theadItems: PropTypes.array.isRequired,
  tbodyItems: PropTypes.array.isRequired,
  theadTrGridStyles: PropTypes.string,
  tbodyTrGridStyles: PropTypes.string,
  theadTrStyles: PropTypes.string,
  theadTrColors: PropTypes.string,
  tbodyTrColors: PropTypes.string,
  tbodyTrStyles: PropTypes.string,
  tableStyles: PropTypes.string

};