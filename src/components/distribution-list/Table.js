import { Form } from '@/components/distribution-list/Form';
import { useAppSelector } from '@/store/hooks';
import { TableHead, TableBody } from './';
import PropTypes from 'prop-types';
import { DeleteForm } from './';

export const Table = (
  {
    theadItems,
    tbodyItems,
    tableStyles,
    theadTrColors,
    theadTrStyles,
    tbodyTrColors,
    tbodyTrStyles,
    handleCloseForm,
    handleEditGroup,
    handleDeleteForm,
    theadTrGridStyles,
    tbodyTrGridStyles
  }
) => {

  const { openGroupForm, openGroupDeleteForm } = useAppSelector( state => state.distributionList );
  
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
          handleEditGroup={ handleEditGroup }
          tbodyTrGridStyles={ tbodyTrGridStyles }
        />
      </table>
      { openGroupForm && <Form handleCloseForm={handleCloseForm} /> }
      { openGroupDeleteForm &&
          <DeleteForm
            handleClick={handleDeleteForm}
          /> 
      }
    </>
  );
};

Table.propTypes = {
  theadTrGridStyles: PropTypes.string.isRequired,
  tbodyTrGridStyles: PropTypes.string.isRequired,
  tableStyles      : PropTypes.string.isRequired,
  theadItems       : PropTypes.array.isRequired,
  tbodyItems       : PropTypes.array.isRequired,
  handleEditGroup  : PropTypes.func.isRequired,
  handleCloseForm  : PropTypes.func.isRequired,
  handleDeleteForm : PropTypes.func.isRequired,
  theadTrColors    : PropTypes.string,
  theadTrStyles    : PropTypes.string,
  tbodyTrColors    : PropTypes.string,
  tbodyTrStyles    : PropTypes.string,
};
