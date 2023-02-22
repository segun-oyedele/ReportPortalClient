import { TableGroupsDropdown } from './TableGroupsDropdown';
import { useAppSelector } from '../../store/hooks';
import PropTypes from 'prop-types';

const trColorsDefault = 'text-gray-600 bg-white';
const trStylesDefault = 'text-sm leading-normal';

export const TableBody = ({ tbodyItems, tbodyTrStyles, tbodyTrColors, tbodyTrGridStyles, handleEditGroup }) => {

  const { currentGroupPage } = useAppSelector(state => state.distributionList);

  return (
    <tbody>
      {
        tbodyItems.map(({ portal_distribution_id, distribution_name, email = "", active }, index) => (
          <tr
            key={`${distribution_name}-${portal_distribution_id}-${index}`}
            className={`items-center table-item select-none ${tbodyTrStyles || trStylesDefault} ${tbodyTrColors || trColorsDefault} ${tbodyTrGridStyles || ''}`}
          >
            <td
              onDoubleClick={() => handleEditGroup({ portal_distribution_id, distribution_name, email, active })}
              className="hidden px-6 text-base text-left truncate cursor-pointer raleway-m max-h-16 table_text-black sm:block"
              title={distribution_name}
            ><span className="mr-5 table_text-black">{ currentGroupPage > 1 ? ((currentGroupPage - 1) * 10) + (index + 1) : index + 1}</span> {distribution_name}</td>
            <td
              onDoubleClick={() => handleEditGroup({ portal_distribution_id, distribution_name, email, active })}
              className="max-h-full px-6 text-left cursor-pointer"
            >{email}</td>
            <td
              onDoubleClick={() => handleEditGroup({ portal_distribution_id, distribution_name, email, active })}
              className="px-6 text-center cursor-pointer hidden md:block"
            >
              <span className="w-[73px] bg-[#4092001a] inline-block rounded text-[#409200] h-[33px] leading-[33px] raleway-sb">ACTIVE</span>
            </td>
            <td className="grid justify-start grid-flow-col gap-5 px-4 py-3 text-center max-h-16 justify-items-center">
              <TableGroupsDropdown
                handleEditGroup={handleEditGroup}
                group={ { portal_distribution_id, distribution_name, email, active } }
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
      portal_distribution_id: PropTypes.number,
      distribution_name: PropTypes.string.isRequired,
      email: PropTypes.string
    }
  )).isRequired,
  tbodyTrStyles: PropTypes.string,
  tbodyTrColors: PropTypes.string,
  tbodyTrGridStyles: PropTypes.string,
  handleEditGroup: PropTypes.func.isRequired
};
