import { useAppSelector } from '@/store/hooks';
import PropTypes from 'prop-types';
import { memo } from 'react';

const trColorsDefault = 'text-gray-600 bg-white';
const trStylesDefault = 'text-sm leading-normal';

export const TableBody = memo(({ tbodyItems, tbodyTrStyles, tbodyTrColors, tbodyTrGridStyles, showEnumeration,sort }) => {

  const { currentPage, itemsPerPage } = useAppSelector(state => state.detailedReport);
  const sorted = sort
      ? tbodyItems.slice().sort((a, b) => (a[sort.title] > b[sort.title] ? sort.ascending ? 1 : -1 : sort.ascending ? -1 : 1))
      : tbodyItems;
  return (
    <tbody>
      {
        sorted.map(({ terminal_name, driver_no, last_name, first_name, noncomplete_count, complete_count }, index) => (
            <tr
              key={`${driver_no}-${terminal_name}-${index}`}
              className={`items-center table-item select-none ${tbodyTrStyles || trStylesDefault} ${tbodyTrColors || trColorsDefault} ${tbodyTrGridStyles || ''}`}
            >
              <td
                className="hidden px-6 text-base text-left truncate max-h-16 table_text-black sm:block"
                title={ terminal_name }
              >
                { showEnumeration && <span className="mr-5 table_text-black">{ currentPage > 1 ? ((currentPage - 1) * itemsPerPage) + (index + 1) : index + 1 }</span> }
                <span className="raleway-m">{ terminal_name }</span>
              </td>
              <td
                className="hidden max-h-full px-6 text-center lg:block"
              >{ driver_no }</td>
              <td
                className="max-h-full px-6 text-center"
              >{ last_name }</td>
              <td
                className="max-h-full px-6 text-center"
              >{ first_name }</td>
              <td
                className="hidden max-h-full px-6 text-center lg:block"
              >{ noncomplete_count }</td>
              <td
                className="hidden max-h-full px-6 text-center lg:block"
              >{ complete_count }</td>
            </tr>
        ))
      }
      {
        !tbodyItems.length &&
        <tr className="h-20 border-b border-gray-200 md:h-20 table-item">
          <td className="text-lg font-medium text-center text-gray-400 uppercase">NO GROUPS TO SHOW</td>
        </tr>
      }
    </tbody>
  );
});

TableBody.propTypes = {
  tbodyItems: PropTypes.array.isRequired,
  tbodyTrStyles: PropTypes.string,
  tbodyTrColors: PropTypes.string,
  tbodyTrGridStyles: PropTypes.string,
  showEnumeration: PropTypes.bool,
  sort: PropTypes.object
};
