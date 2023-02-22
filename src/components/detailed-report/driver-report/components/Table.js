import PropTypes from "prop-types";
import { useState } from "react";

import { TableBody, TableHead } from "./";

export const Table = ({
  theadItems,
  tbodyItems,
  tableStyles,
  theadTrColors,
  theadTrStyles,
  tbodyTrColors,
  tbodyTrStyles,
  theadTrGridStyles,
  tbodyTrGridStyles,
}) => {
  const [sort, setSort] = useState({
    title: `complete_count`,
    ascending: false,
  });
  const handleSort = (sort) => {
    setSort((state) => ({
      title: sort,
      ascending: !state.ascending,
    }));
  };
  return (
    <table className={tableStyles}>
      <TableHead
        showEnumeration
        theadItems={theadItems}
        theadTrStyles={theadTrStyles}
        theadTrColors={theadTrColors}
        theadTrGridStyles={theadTrGridStyles}
        handleSort={handleSort}
      />

      <TableBody
        showEnumeration
        tbodyItems={tbodyItems}
        tbodyTrColors={tbodyTrColors}
        tbodyTrStyles={tbodyTrStyles}
        tbodyTrGridStyles={tbodyTrGridStyles}
        sort={sort}
      />
    </table>
  );
};

Table.propTypes = {
  theadItems: PropTypes.array,
  tbodyItems: PropTypes.array,
  tableStyles: PropTypes.string,
  theadTrColors: PropTypes.string,
  theadTrStyles: PropTypes.string,
  tbodyTrColors: PropTypes.string,
  tbodyTrStyles: PropTypes.string,
  theadTrGridStyles: PropTypes.string,
  tbodyTrGridStyles: PropTypes.string,
};
