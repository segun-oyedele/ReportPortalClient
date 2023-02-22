import { PencilAltIcon } from '@heroicons/react/solid';
import { useAppSelector } from '@/store/hooks';
import PropTypes from 'prop-types';

const trColorsDefault = 'text-gray-600 bg-white';
const trStylesDefault = 'text-sm leading-normal';

export const TableBody = ({ tbodyItems, tbodyTrStyles, tbodyTrColors, tbodyTrGridStyles, handleEditUser }) => {

  const { currentUsersPage } = useAppSelector(state => state.usersManagement);

  return (
    <tbody>
      {
        tbodyItems.map(({ active, portal_user_id, first_name, last_name, email = "", portal_user_type_id }, index) => (
          <tr
            key={`${first_name}-${portal_user_id}-${index}`}
            className={`items-center table-item table__users select-none ${tbodyTrStyles || trStylesDefault} ${tbodyTrColors || trColorsDefault} ${tbodyTrGridStyles || ''}`}
          >
            <td
              onDoubleClick={() => handleEditUser({ active, portal_user_id, first_name, last_name, email, portal_user_type_id })}
              className="px-6 text-base text-left truncate cursor-pointer raleway-m max-h-16 table_text-black"
              title={first_name}
            ><span className="mr-5 table_text-black">{ currentUsersPage > 1 ? ((currentUsersPage - 1) * 10) + (index + 1) : index + 1}</span>{first_name}</td>
            <td
              onDoubleClick={() => handleEditUser({ active, portal_user_id, first_name, last_name, email, portal_user_type_id })}
              className="hidden px-6 text-base text-left truncate cursor-pointer raleway-m max-h-16 table_text-black lg:block"
              title={last_name}
            >{last_name}</td>
            <td
              onDoubleClick={() => handleEditUser({ active, portal_user_id, first_name, last_name, email, portal_user_type_id })}
              className="hidden max-h-full px-6 text-left cursor-pointer sm:block"
            >{email}</td>
            <td
              onDoubleClick={() => handleEditUser({ active, portal_user_id, first_name, last_name, email, portal_user_type_id })}
              className={`px-6 text-base text-left truncate cursor-pointer raleway-m max-h-16 table_text-black hidden md:block ${ portal_user_type_id === 1 ? 'is_admin' : 'is_user' }`}
              title={portal_user_type_id === 1 ? 'Admin' : 'User'}
            ><span className="inline-block text-center raleway-sb">{portal_user_type_id === 1 ? 'Admin' : 'User'}</span></td>
            <td className="grid justify-center grid-flow-col gap-5 px-4 py-3 text-center max-h-16 justify-items-center">
              <PencilAltIcon
                className="w-6 h-6 text-black cursor-pointer"
                onClick={ () => handleEditUser({ active, portal_user_id, first_name, last_name, email, portal_user_type_id }) }
              />
            </td>
          </tr>
        ))
      }
      {
        !tbodyItems.length &&
        <tr className="h-20 border-b border-gray-200 md:h-20 table-item">
          <td className="text-lg font-medium text-center text-gray-400 uppercase">NO USERS TO SHOW</td>
        </tr>
      }
    </tbody>
  )
}

TableBody.propTypes = {
  tbodyTrGridStyles: PropTypes.string.isRequired,
  tbodyItems       : PropTypes.array.isRequired,
  handleEditUser   : PropTypes.func.isRequired,
  tbodyTrStyles    : PropTypes.string,
  tbodyTrColors    : PropTypes.string
}