import { useEffect, useRef } from "react";
import cookie from "cookie";
import { DownloadTableExcel } from "react-export-table-to-excel";

import {
  GoBackButton,
  MainLayout,
  PageTitle,
  Pagination,
  ButtonComponent,
  SearchBar,
  MultiSelect,
  CalendarComponent,
  LoadingComponent,
} from "@/shared/components";
import { theadScannedButUndelivered48hours } from "@/components/detailed-report/data/theadScannedButUndelivered48hours";
import {
  DownloadTable,
  Table,
} from "@/components/detailed-report/scanned-but-undelivered-48-hour/components";
import { useFilter } from "@/components/detailed-report";
 
import {
  getDetailedScannedButUndelivered48HourCountByAging,
  getDCTerminals,
} from "@/store/detailed-report/thunks";
import { setAuthentication } from "@/store/user";
import getStore from "@/store/store";
import { useAppSelector } from "@/store/hooks";
import { useDispatch } from "react-redux";

const ScannedButUndelivered48hour = () => {
  const {
    currentPage,
    searchText,
    itemsLength,
    currentItems,
    handleSearch,
    handleChangePage,
    itemsPerPage,
    allItems,
    selectedTerminals,
    totalSelectedItems,
    handleSelectedItems,
    handleSubmitFilter,
    dateValue,
    onDateChange,
  } = useFilter();

  const tableRef = useRef(null);

  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getDetailedScannedButUndelivered48HourCountByAging());
  //   dispatch(getDCTerminals());
  // }, []);

  const { loadingTerminals } = useAppSelector((state) => state.detailedReport);
  console.log(currentItems)

  return (
    <MainLayout title="Detailed Report | Driver">
      <GoBackButton />

      <section className="relative flex flex-col items-center justify-between gap-6 px-5 mb-10 lg:flex-row md:px-0 md:mb-10 filter_bar">
        <PageTitle
          title="Scanned But Undelivered 48 hour"
          stylesClass="text-xl raleway-b"
        />

        <div className="flex flex-col w-full gap-6 lg:w-auto lg:flex-row lg:justify-evenly detailed__report-searchbar">
          <SearchBar
            handleSearch={handleSearch}
            searchText={searchText}
            placeholderText="Search by Account Number"
            inputStyles="h-full w-full resize-none"
            stylesContainer="w-full lg:w-96 2xl:w-[536px]"
            isTextarea
          />

          <div className="grid grid-rows-2 w-full gap-6 lg:w-[243px] detailed__report-filter">
            <CalendarComponent date={dateValue} onChangeDate={onDateChange} />

            <MultiSelect
              terminals={selectedTerminals}
              totalSelectedItems={totalSelectedItems}
              handleSelectedItems={handleSelectedItems}
              title='Filter By DC Segments'
              dcSegment={true}
            />
          </div>

          <div className="flex flex-col w-full gap-6 lg:w-40">
            <ButtonComponent
              btnLabel="Run"
              labelStyles="text-lg raleway-b"
              btnColors="primary-blue hover:opacity-90 transition duration-300 ease-in-out"
              btnStyles="rounded-lg w-auto justify-center lg:w-40"
              onClick={() => handleSubmitFilter("is48")}
            />

            <DownloadTableExcel
              filename="Scanned But Undelivered 48 hour Report"
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
          currentItems.length > 0 &&
          <>
            <Table
              theadTrGridStyles="grid grid-cols-[repeat(2,_1fr)] sm:grid-cols-[repeat(3,_1fr)] justify-evenly gap-5 items-center h-16"
              tbodyTrGridStyles="grid grid-cols-[repeat(2,_1fr)] sm:grid-cols-[repeat(3,_1fr)] justify-evenly gap-5 h-14"
              tableStyles="w-full table-auto min-w-full max-w-fit"
              theadItems={theadScannedButUndelivered48hours}
              tbodyItems={currentItems}
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
          theadTrGridStyles="grid grid-cols-[repeat(2,_1fr)] sm:grid-cols-[repeat(3,_1fr)] justify-evenly gap-5 items-center h-16"
          tbodyTrGridStyles="grid grid-cols-[repeat(2,_1fr)] sm:grid-cols-[repeat(3,_1fr)] justify-evenly gap-5 h-14"
          theadItems={theadScannedButUndelivered48hours}
          allItems={allItems}
          tableRef={tableRef}
        />
      </section>
    </MainLayout>
  );
};

export const getServerSideProps = async (ctx) => {
  const cookies = cookie.parse(ctx.req.headers.cookie || "");
  const userCookie = cookies?.user_token;
  const store = getStore();
  if (!!userCookie) {
    store.dispatch(setAuthentication(true));
  }
  // await store.dispatch(getDetailedScannedButUndelivered48HourCountByAging());
  await store.dispatch(getDCTerminals());

  return {
    props: {
      initialState: store.getState(),
    },
  };
};

export default ScannedButUndelivered48hour;
