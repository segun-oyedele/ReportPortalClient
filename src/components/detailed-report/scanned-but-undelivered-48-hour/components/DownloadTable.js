import PropTypes from "prop-types";
import { useState } from "react";

import { TableBody, TableHead } from "./";

export const DownloadTable = ({
  theadItems,
  theadTrColors,
  theadTrStyles,
  tbodyTrColors,
  tbodyTrStyles,
  theadTrGridStyles,
  tbodyTrGridStyles,
  allItems,
  tableRef,
}) => {
  return (
    <table className="hidden" ref={tableRef}>
      <TableHead
        theadItems={theadItems}
        theadTrStyles={theadTrStyles}
        theadTrColors={theadTrColors}
        theadTrGridStyles={theadTrGridStyles}
      />

      <TableBody
        tbodyItems={allItems}
        tbodyTrColors={tbodyTrColors}
        tbodyTrStyles={tbodyTrStyles}
        tbodyTrGridStyles={tbodyTrGridStyles}
      />
    </table>
  );
};

DownloadTable.propTypes = {
  theadItems: PropTypes.array,
  theadTrColors: PropTypes.string,
  theadTrStyles: PropTypes.string,
  tbodyTrColors: PropTypes.string,
  tbodyTrStyles: PropTypes.string,
  theadTrGridStyles: PropTypes.string,
  tbodyTrGridStyles: PropTypes.string,
  allItems: PropTypes.array,
  tableRef: PropTypes.object,
};
