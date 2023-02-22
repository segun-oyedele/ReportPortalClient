import { useEffect, useRef } from "react";
import cookie from "cookie";
import { DownloadTableExcel } from "react-export-table-to-excel";

import {
  DownloadTable,
  FilterByDriverType,
  Table,
} from "@/components/detailed-report/driver-report/components";
import {
  GoBackButton,
  MainLayout,
  PageTitle,
  Pagination,
  ButtonComponent,
  LoadingComponent,
  MultiSelect,
  SearchBar,
  CalendarComponent,
} from "@/shared/components";
import { theadDriverReports } from "@/components/detailed-report/data";
import { getDriverReport, getDCTerminals } from "@/store/detailed-report/thunks";
import { useFilter } from "@/components/detailed-report";
import getStore from "@/store/store";
import { setAuthentication } from "@/store/user";
import { useAppSelector } from "@/store/hooks";
import { useDispatch } from "react-redux";

const DriverReport = () => {
  const {
    currentPage,
    searchText,
    selectedTerminals,
    itemsLength,
    currentItems,
    handleChangePage,
    itemsPerPage,
    allItems,
    totalSelectedItems,
    handleSubmitFilterDriverReport,
    handleSelectedItems,
    handleChangeDriverType,
    selectedDriverType,
    dateValue,
    onDateChange,
    handleSearch,
  } = useFilter();

  const tableRef = useRef(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDriverReport());
    dispatch(getDCTerminals());
  }, []);

  const { loadingTerminals } = useAppSelector((state) => state.detailedReport);

  return (
    <MainLayout title="Detailed Report | Driver">
      <GoBackButton />

      <section className="relative flex flex-col items-center justify-between gap-6 px-5 mb-10 lg:flex-row md:px-0 md:mb-10 filter_bar">
        <PageTitle title="Driver Report" stylesClass="text-xl raleway-b" />
        <div className="flex flex-col w-full gap-6 lg:w-auto lg:flex-row lg:justify-evenly detailed__report-searchbar">
          <div className="grid grid-rows-2 gap-6">
            <SearchBar
              handleSearch={handleSearch}
              searchText={searchText}
              placeholderText="Search by Driver Number"
              inputStyles="h-full w-full resize-none"
              stylesContainer="w-full lg:w-96 2xl:w-[536px]"
            />
            <CalendarComponent date={dateValue} onChangeDate={onDateChange} />
          </div>

          <div className="grid grid-rows-2 w-full gap-6 lg:w-[243px] detailed__report-filter">
            <MultiSelect
              terminals={selectedTerminals}
              totalSelectedItems={totalSelectedItems}
              handleSelectedItems={handleSelectedItems}
              title="Filter by Driver DC"
            />

            <FilterByDriverType
              handleChangeDriverType={handleChangeDriverType}
              selectedDriverType={selectedDriverType}
            />
          </div>

          <div className="flex flex-col w-full gap-6 lg:w-40">
            <ButtonComponent
              btnLabel="Filter"
              labelStyles="text-lg raleway-b"
              btnColors="primary-blue hover:opacity-90 transition duration-300 ease-in-out"
              btnStyles="rounded-lg w-auto justify-center lg:w-40"
              onClick={handleSubmitFilterDriverReport}
            />

            <DownloadTableExcel
              filename="Driver Report"
              sheet="reports"
              currentTableRef={tableRef.current}
            >
              <ButtonComponent
                btnLabel="Export Report"
                labelStyles="text-lg raleway-b"
                btnColors="primary-blue btn-green hover:opacity-90 transition duration-300 ease-in-out"
                btnStyles="rounded-lg w-auto justify-center lg:w-40"
                onClick={() => {}}
              />
            </DownloadTableExcel>
          </div>
        </div>
      </section>

      <section>
        {loadingTerminals ? (
          <LoadingComponent />
        ) : (
          <>
            <Table
              theadTrGridStyles="grid grid-cols-[repeat(2,_1fr)] sm:grid-cols-[repeat(4,_1fr)] md:grid-cols-[repeat(4,_1fr)] lg:grid-cols-[repeat(6,_1fr)] justify-evenly gap-5 items-center h-16"
              tbodyTrGridStyles="grid grid-cols-[repeat(2,_1fr)] sm:grid-cols-[repeat(4,_1fr)] md:grid-cols-[repeat(4,_1fr)] lg:grid-cols-[repeat(6,_1fr)] justify-evenly gap-5 h-14"
              tableStyles="w-full table-auto min-w-full max-w-fit"
              theadItems={theadDriverReports}
              tbodyItems={currentItems}
              tableRef={tableRef}
              allItems={allItems}
            />

            <Pagination
              handleChangePage={handleChangePage}
              currentItemPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={itemsLength}
            />
          </>
        )}
        <DownloadTable
          theadTrGridStyles="grid grid-cols-[repeat(2,_1fr)] sm:grid-cols-[repeat(4,_1fr)] md:grid-cols-[repeat(4,_1fr)] lg:grid-cols-[repeat(6,_1fr)] justify-evenly gap-5 items-center h-16"
          tbodyTrGridStyles="grid grid-cols-[repeat(2,_1fr)] sm:grid-cols-[repeat(4,_1fr)] md:grid-cols-[repeat(4,_1fr)] lg:grid-cols-[repeat(6,_1fr)] justify-evenly gap-5 h-14"
          theadItems={theadDriverReports}
          tableRef={tableRef}
          allItems={allItems}
        />
      </section>
    </MainLayout>
  );
};

export const getServerSideProps = async (ctx) => {
  // const cookies = cookie.parse(ctx.req.headers.cookie || "");
  // const userCookie = cookies?.user_token;
  // const store = getStore();
  // if (!!userCookie) {
  // }
  store.dispatch(setAuthentication(true));

  await store.dispatch(getDriverReport());
  await store.dispatch(getDCTerminals());

  return {
    props: {
      initialState: store.getState(),
    },
  };
};

export default DriverReport;
