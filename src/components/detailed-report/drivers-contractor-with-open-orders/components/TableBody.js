import { memo } from "react";
import { useAppSelector } from "@/store/hooks";
import PropTypes from "prop-types";

const trColorsDefault = "text-gray-600 bg-white";
const trStylesDefault = "text-sm leading-normal";

export const TableBody = memo(
  ({
    tbodyItems,
    tbodyTrStyles,
    tbodyTrColors,
    tbodyTrGridStyles,
    showEnumeration,
    sort,
  }) => {
    const { currentPage, itemsPerPage } = useAppSelector(
      (state) => state.detailedReport
    );
    const sorted = sort
      ? tbodyItems
          .slice()
          .sort((a, b) =>
            a[sort.title] > b[sort.title]
              ? sort.ascending
                ? 1
                : -1
              : sort.ascending
              ? -1
              : 1
          )
      : tbodyItems;
    return (
      <tbody>
        {sorted.map(({ order_count, driver_no, driver_dc }, index) => (
          <tr
            key={`${order_count}-${driver_dc}-${index}`}
            className={`items-center table-item select-none ${
              tbodyTrStyles || trStylesDefault
            } ${tbodyTrColors || trColorsDefault} ${tbodyTrGridStyles || ""}`}
          >
            <td
              className="hidden px-6 text-base text-left truncate max-h-16 table_text-black sm:block"
              title={order_count}
            >
              {showEnumeration && (
                <span className="mr-5 table_text-black">
                  {currentPage > 1
                    ? (currentPage - 1) * itemsPerPage + (index + 1)
                    : index + 1}
                </span>
              )}
              <span className="raleway-m">{order_count}</span>
            </td>
            <td className="max-h-full px-6 text-center">{driver_no}</td>
            <td className="max-h-full px-6 text-center">{driver_dc}</td>
          </tr>
        ))}
        {!tbodyItems.length && (
          <tr className="h-20 border-b border-gray-200 md:h-20 table-item">
            <td className="text-lg font-medium text-center text-gray-400 uppercase">
              NO GROUPS TO SHOW
            </td>
          </tr>
        )}
      </tbody>
    );
  }
);

TableBody.propTypes = {
  tbodyItems: PropTypes.array.isRequired,
  tbodyTrStyles: PropTypes.string,
  tbodyTrColors: PropTypes.string,
  tbodyTrGridStyles: PropTypes.string,
  showEnumeration: PropTypes.bool,
  sort: PropTypes.object,
};
