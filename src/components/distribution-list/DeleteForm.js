import Image from 'next/image';
import PropTypes from 'prop-types';
import { PageTitle } from '@/shared/components/PageTitle';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ButtonComponent } from '@/shared/components/ButtonComponent';
import { PageDescription } from '@/shared/components/PageDescription';
import { setOpenGroupDeleteForm } from '@/store/distribution-list';

export const DeleteForm = ({ handleClick }) => {

  const dispatch = useAppDispatch();
  const { groupToDelete } = useAppSelector( state => state.distributionList );

  return (

    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-slate-200/50">
      <div className="w-full max-w-md bg-white shadow form__container delete__form">

        <div className="flex justify-center mb-2">
          <Image
            src={`${process.env.iisPath}/img/icons/delete_group_icon.svg}`}
            alt="Delete Icon"
            width={100}
            height={100}
          />
        </div>

        <PageTitle
          title="Delete group"
          stylesClass="text-center raleway-b text-3xl mb-2"
        />

        <PageDescription
          title=''
          stylesClass="text-center w-72 form__description mx-auto"
        >
          Are you sure you want to delete the <span className="raleway-eb">{ groupToDelete.distribution_name }</span> group?
        </PageDescription>

        <div className="grid grid-cols-[1fr_1fr] lg:grid-cols-[208px_208px] gap-4 mt-11 form__button-container justify-center">
          <ButtonComponent
            onClick={handleClick}
            btnType='submit'
            btnColors='relative flex justify-center w-full px-4 py-2 text-lg text-white ease-in-out border border-transparent rounded-md group focus:outline-none primary__button form__button delete__button transition-opacity ease-in-out duration-300 hover:opacity-60'
            btnLabel='Delete'
            labelColors='raleway-b'
          />

          <ButtonComponent
            onClick={ () => dispatch(setOpenGroupDeleteForm(false)) }
            btnColors='relative flex justify-center w-full px-4 py-2 text-lg text-white transition-opacity duration-300 ease-in-out bg-white border border-transparent rounded-mdfocus:outline-none form__button second__button hover:opacity-60'
            btnLabel='Cancel'
            labelColors='raleway-b'
          />
        </div>
        
      </div>
    </div>
  );
};

DeleteForm.propTypes = {
  handleClick: PropTypes.func.isRequired
};