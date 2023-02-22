import cookie from 'cookie';
import { PlusSmIcon } from '@heroicons/react/solid';
import { Pagination } from '@/shared/components/Pagination';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { groupsFilter, Table, theadGroups } from '@/components/distribution-list';
import { ButtonComponent, MainLayout, PageTitle, SearchBar } from '@/shared/components';
import { getDistributionList, setActiveGroup, setGroupToDelete, setOpenGroupDeleteForm, setOpenGroupForm, updateDistribution } from '@/store/distribution-list';
import getStore from '@/store/store';
import { setAuthentication } from '@/store/user';
import { alertPopup } from '@/shared/helpers';

const DistributionList = () => {

  const { currentGroupPage, searchText, setSearchText, groupsLength, currentGroups, handleSearch, handleChangePage, groupsPerPage } = groupsFilter();
  const { groupToDelete } = useAppSelector(state => state.distributionList);
  const dispatch = useAppDispatch();

  const handleCloseForm = () => {
    dispatch(setOpenGroupForm(false));
    dispatch(setActiveGroup());
  }

  const handleDeleteForm = async() => {
    const { payload } = await dispatch(updateDistribution({ ...groupToDelete, active: 0 }));
    if(payload) {
      alertPopup(`The ${groupToDelete.distribution_name} group has been deleted`);
    } else {
      alertPopup(`Something went wrong deleting the ${groupToDelete.distribution_name} group`, 'error');
    }

    dispatch(setOpenGroupDeleteForm(false));
    dispatch(setGroupToDelete());
  }

  const handleEditGroup = (group) => {
    dispatch(setActiveGroup(group));
    dispatch(setOpenGroupForm(true));
  }

  return (
    <MainLayout
      title="Distribution List"
    >
      <section className="relative flex flex-col items-center justify-between gap-6 px-5 mt-4 lg:flex-row md:px-0 md:mb-10 filter_bar">
        <PageTitle
          title="Distribution List"
          stylesClass="text-xl raleway-b"
        />

        <div className="flex flex-col w-full gap-6 md:w-auto md:flex-row md:justify-evenly">
          <SearchBar
            handleSearch={handleSearch}
            setSearchText={setSearchText}
            searchText={searchText}
            inputStyles="h-full"
            placeholderText="Search by Email"
          />
          <ButtonComponent
            btnLabel="Add Group"
            labelStyles="hidden xl:inline-block text-lg raleway-b"
            btnColors="primary-blue hover:opacity-90 transition duration-300 ease-in-out"
            btnStyles="rounded-full xl:rounded-lg xl:static xl:bottom-0 xl:right-0 fixed bottom-4 right-4 w-14 xl:h-auto xl:w-auto"
            onClick={() => dispatch(setOpenGroupForm(true))}
          >
            <PlusSmIcon className="text-white w-7 h-7 md:w-6 md:h-6 xl:hidden" />
          </ButtonComponent>
        </div>
      </section>

      <section>
        <Table
          tableStyles="w-full table-auto min-w-full max-w-fit"
          theadItems={theadGroups}
          theadTrGridStyles="grid grid-cols-[1fr_88px] justify-evenly sm:grid-cols-[1fr_1fr_1fr_88px] xl:grid-cols-[364px_1fr_1fr_88px] gap-5 items-center"
          tbodyItems={currentGroups}
          tbodyTrGridStyles="grid grid-cols-[1fr_88px] justify-evenly sm:grid-cols-[1fr_1fr_1fr_88px] xl:grid-cols-[364px_1fr_1fr_88px] gap-5"
          handleCloseForm={handleCloseForm}
          handleEditGroup={handleEditGroup}
          handleDeleteForm={handleDeleteForm}
        />

        <Pagination
          itemsPerPage={groupsPerPage}
          totalItems={groupsLength}
          handleChangePage={handleChangePage}
          currentItemPage={currentGroupPage}
        />
      </section>
    </MainLayout>
  );
};

export const getServerSideProps = async(ctx) => {
  const cookies = cookie.parse(ctx.req.headers.cookie || '');
  const userCookie = cookies?.user_token;
  const store = getStore();
  if(!!userCookie) {
    store.dispatch(setAuthentication(true));
  }
  await store.dispatch(getDistributionList());

  return {
    props: {
      initialState: store.getState(),
    }
  }
}

export default DistributionList;