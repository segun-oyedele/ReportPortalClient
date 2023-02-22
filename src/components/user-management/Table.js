import { useAppSelector } from '@/store/hooks';
import { TableHead, TableBody, Form } from './';
import PropTypes from 'prop-types';

export const Table = (
  {
    theadItems,
    tbodyItems,
    tableStyles,
    theadTrColors,
    theadTrStyles,
    tbodyTrColors,
    tbodyTrStyles,
    handleEditUser,
    handleCloseForm,
    theadTrGridStyles,
    tbodyTrGridStyles
  }
  ) => {

    const { openUserForm } = useAppSelector( state => state.usersManagement );

  return (
    <>
      <table className={ tableStyles }>
        <TableHead
          theadItems={ theadItems }
          theadTrStyles={ theadTrStyles }
          theadTrColors={ theadTrColors }
          theadTrGridStyles={ theadTrGridStyles }
        />

        <TableBody
          tbodyItems={ tbodyItems }
          tbodyTrColors={ tbodyTrColors }
          tbodyTrStyles={ tbodyTrStyles }
          handleEditUser={ handleEditUser }
          tbodyTrGridStyles={ tbodyTrGridStyles }
        />
      </table>
      { openUserForm && <Form handleCloseForm={handleCloseForm} /> }
    </>
  )
}

Table.propTypes = {
  theadTrGridStyles: PropTypes.string.isRequired,
  tbodyTrGridStyles: PropTypes.string.isRequired,
  tableStyles      : PropTypes.string.isRequired,
  theadItems       : PropTypes.array.isRequired,
  tbodyItems       : PropTypes.array.isRequired,
  handleEditUser   : PropTypes.func.isRequired,
  handleCloseForm  : PropTypes.func.isRequired,
  theadTrColors    : PropTypes.string,
  theadTrStyles    : PropTypes.string
}