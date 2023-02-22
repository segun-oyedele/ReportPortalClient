import { PlusSmIcon } from '@heroicons/react/solid';
import cookie from 'cookie';

import { useAppDispatch } from '@/store/hooks';

import { Pagination } from '@/shared/components/Pagination';
import { getUsers, setActiveUser, setOpenUserForm } from '@/store/user-management';
import { ButtonComponent, MainLayout, PageTitle, SearchBar } from '@/shared/components';
import { FilterByStatusButton, Table, theadUsers, userManagementFilter } from '@/components/user-management';
import getStore from '@/store/store';
import { setAuthentication } from '@/store/user';

const UserManagement = () => {

  const { currentUsersPage, searchText, setSearchText, usersLength, currentUsers, handleSearch, handleChangePage, usersPerPage } = userManagementFilter();
  const dispatch = useAppDispatch();

  const handleCloseForm = () => {
    dispatch(setOpenUserForm(false));
    dispatch(setActiveUser());
  }

  const handleEditUser = (user) => {
    dispatch(setActiveUser(user));
    dispatch(setOpenUserForm(true));
  }

  return (
    <MainLayout
      title="User Management"
    >
      <section className="relative flex flex-col items-center justify-between gap-6 px-5 mt-4 lg:flex-row md:px-0 md:mb-10 filter_bar">
        <PageTitle
          title="User Management List"
          stylesClass="text-xl raleway-b"
        />

        <div className="flex flex-col w-full gap-6 md:w-auto md:flex-row md:justify-evenly">
          <SearchBar
            handleSearch={handleSearch}
            setSearchText={setSearchText}
            searchText={searchText}
            placeholderText="Search by First Name"
          />
          <FilterByStatusButton />
          <ButtonComponent
            btnLabel="Filter"
            labelStyles="hidden xl:inline-block text-lg raleway-b"
            btnColors="primary-blue hover:opacity-90 transition duration-300 ease-in-out"
            btnStyles="rounded-full xl:rounded-lg xl:static xl:bottom-0 xl:right-0 fixed bottom-4 right-4 w-14 xl:h-auto xl:w-auto"
            onClick={() => console.log("Filter")}
          >
            <PlusSmIcon className="text-white w-7 h-7 md:w-6 md:h-6 xl:hidden" />
          </ButtonComponent>
        </div>
      </section>

      <section>
        <Table
          tableStyles="w-full table-auto min-w-full max-w-fit"
          theadItems={theadUsers}
          theadTrGridStyles="grid grid-cols-[2fr_1fr] sm:grid-cols-[2fr_1.5fr_1fr] justify-evenly md:grid-cols-[1fr_2fr_1fr_88px] lg:grid-cols-[1fr_1fr_2fr_1fr_88px] gap-5 items-center"
          tbodyItems={currentUsers}
          tbodyTrGridStyles="grid grid-cols-[2fr_1fr] sm:grid-cols-[2fr_1.5fr_1fr] justify-evenly md:grid-cols-[1fr_2fr_1fr_88px] lg:grid-cols-[1fr_1fr_2fr_1fr_88px] gap-5"
          handleCloseForm={handleCloseForm}
          handleEditUser={handleEditUser}
        />

        <Pagination
          itemsPerPage={usersPerPage}
          totalItems={usersLength}
          handleChangePage={handleChangePage}
          currentItemPage={currentUsersPage}
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
  await store.dispatch(getUsers());

  return {
    props: {
      initialState: store.getState(),
    }
  }
}

export default UserManagement;