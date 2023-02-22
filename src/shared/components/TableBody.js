import { useAppSelector } from '@/store/hooks';
import PropTypes from 'prop-types';

const trColorsDefault = 'text-gray-600 bg-white';
const trStylesDefault = 'text-sm leading-normal';

export const TableBody = ({tbodyItems, tbodyTrColors, tbodyTrStyles, tbodyTrGridStyles, tableColumns}) => {


  const { currentPage } = useAppSelector(state => state.detailedReport);

  return (
    <tbody>
      {
        tbodyItems.map((item, index) => (
          <tr
            key={`${item}-${index}`}
            className={`items-center table-item table_detailed select-none ${tbodyTrStyles || trStylesDefault} ${tbodyTrColors || trColorsDefault} ${tbodyTrGridStyles || ''}`}
          >
            { tableColumns.map( (column, columnIdx) => (
              <td key={`${item}-${columnIdx}-${column}`} className={`table_text-black text-base ${columnIdx === 0 ? 'raleway-m' : ''}`}>
                { columnIdx === 0 && <span className="mr-5">{index + 1}</span>}
                {item[column.field]}
              </td>
            )) }
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
}

TableBody.propTypes = {
  tbodyItems: PropTypes.array.isRequired,
  tbodyTrGridStyles: PropTypes.string,
  tbodyTrStyles: PropTypes.string,
  tbodyTrColors: PropTypes.string,
  tbodyTrStyles: PropTypes.string
};
