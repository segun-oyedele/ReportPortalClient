import { TableGroupsDropdown } from './TableGroupsDropdown';
import { useAppSelector } from '@/store/hooks';
import PropTypes from 'prop-types';

const trColorsDefault = 'text-gray-600 bg-white';
const trStylesDefault = 'text-sm leading-normal';

export const TableBody = ({ tbodyItems, tbodyTrStyles, tbodyTrColors, tbodyTrGridStyles, handleEditGroup }) => {

  const { currentGroupPage } = useAppSelector(state => state.distributionList);

  return (
    <tbody>
      {
        tbodyItems.map((report, index) => (
          <tr
            key={`${report.report_name}-${report.portal_summary_report_id}-${index}`}
            className={`items-start table-item table__summary pt-6 pb-2 select-none ${tbodyTrStyles || trStylesDefault} ${tbodyTrColors || trColorsDefault} ${tbodyTrGridStyles || ''}`}
          >
            <td
              onDoubleClick={() => handleEditGroup(report)}
              className="hidden px-6 text-base text-left truncate cursor-pointer raleway-m max-h-16 table_text-black md:block"
              title={report.report_name}
            ><span className="mr-5 table_text-black">{ currentGroupPage > 1 ? ((currentGroupPage - 1) * 10) + (index + 1) : index + 1}</span>{report.report_name}</td>
            <td
              onDoubleClick={() => handleEditGroup(report)}
              className="max-h-full px-6 text-base text-left truncate whitespace-pre-wrap cursor-pointer table_text-black"
            >{report.distribution_name}</td>
            <td
              onDoubleClick={() => handleEditGroup(report)}
              className="hidden max-h-full px-6 text-base text-left truncate whitespace-pre-wrap cursor-pointer lg:block raleway-m table_text-black"
            >{report.report_frequency}</td>
            <td
              onDoubleClick={() => handleEditGroup(report)}
              className="hidden max-h-full px-6 text-base text-left truncate whitespace-pre-wrap cursor-pointer lg:block raleway-m table_text-black"
            >{report.report_time}</td>
            <td
              onDoubleClick={() => handleEditGroup(report)}
              className="hidden max-h-full px-6 text-base text-center truncate whitespace-pre-wrap cursor-pointer md:block table_text-black"
            >
              <span className="w-[73px] bg-[#4092001a] inline-block rounded text-[#409200] h-[33px] leading-[33px] raleway-sb">ACTIVE</span>
            </td>
            <td className="grid justify-start grid-flow-col gap-5 px-4 py-3 text-center max-h-16 justify-items-center">
              <TableGroupsDropdown
                handleEditGroup={handleEditGroup}
                group={ report }
              />
            </td>
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
};

TableBody.propTypes = {
  tbodyItems: PropTypes.arrayOf(PropTypes.shape(
    {
      distribution_list_id: PropTypes.number,
      distribution_id: PropTypes.string.isRequired,
      report_name: PropTypes.string.isRequired,
    }
  )).isRequired,
  tbodyTrStyles: PropTypes.string,
  tbodyTrColors: PropTypes.string,
  tbodyTrGridStyles: PropTypes.string,
  handleEditGroup: PropTypes.func.isRequired
};
