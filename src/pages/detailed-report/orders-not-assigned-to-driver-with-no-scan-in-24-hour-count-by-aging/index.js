import { useEffect, useRef } from "react"
import cookie from "cookie"
import { DownloadTableExcel } from "react-export-table-to-excel"

import { useFilter } from "@/components/detailed-report"
import { theadOrdersNotAssigendToDriverWithNoScanIn24HourCountByAging } from "@/components/detailed-report/data"
import {
  DownloadTable,
  Table,
} from "@/components/detailed-report/orders-not-assigend-to-driver-with-no-scan-in-24-hour-count-by-aging/components"
import {
  ButtonComponent,
  CalendarComponent,
  GoBackButton,
  LoadingComponent,
  MainLayout,
  MultiSelect,
  PageTitle,
  Pagination,
  SearchBar,
} from "@/shared/components"
import {
  getDetailedOrderNotAssignedToDriversWithNoScan24CountByAging,
  getTerminals,
} from "@/store/detailed-report/thunks"
import getStore from "@/store/store"
import { setAuthentication } from "@/store/user"
import { useAppSelector } from "@/store/hooks"
import { useDispatch } from "react-redux"

const OrdersNotAssigendToDriverWithNoScanIn24HourCountByAging = () => {
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
  } = useFilter()

  const tableRef = useRef(null)

  const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(getDetailedOrderNotAssignedToDriversWithNoScan24CountByAging());
  //   dispatch(getTerminals());
  // }, []);

  const { loadingTerminals } = useAppSelector((state) => state.detailedReport)

  return (
    <MainLayout title='Detailed Report | Driver'>
      <GoBackButton />

      <section className='relative flex flex-col items-center justify-between gap-6 px-5 mb-10 lg:flex-row md:px-0 md:mb-10 filter_bar'>
        <PageTitle
          title='Orders Not Assigend To Driver With No Scan in 24 Hour Count By Aging'
          stylesClass='text-xl raleway-b'
        />

        <div className='flex flex-col w-full gap-6 lg:w-auto lg:flex-row lg:justify-evenly detailed__report-searchbar'>
          <SearchBar
            handleSearch={handleSearch}
            searchText={searchText}
            placeholderText='Search by Account Number'
            inputStyles='h-full w-full resize-none'
            stylesContainer='w-full lg:w-96 2xl:w-[536px]'
            isTextarea
          />

          <div className='grid grid-rows-2 w-full gap-6 lg:w-[243px] detailed__report-filter'>
            <CalendarComponent date={dateValue} onChangeDate={onDateChange} />

            <MultiSelect
              terminals={selectedTerminals}
              totalSelectedItems={totalSelectedItems}
              handleSelectedItems={handleSelectedItems}
            />
          </div>

          <div className='flex flex-col w-full gap-6 lg:w-40'>
            <ButtonComponent
              btnLabel='Filter'
              labelStyles='text-lg raleway-b'
              btnColors='primary-blue hover:opacity-90 transition duration-300 ease-in-out'
              btnStyles='rounded-lg w-auto justify-center lg:w-40'
              onClick={() => handleSubmitFilter("is24")}
            />

            <DownloadTableExcel
              filename='Orders Not Assigend To Driver With No Scan in 24 Hour Count By Aging'
              sheet='reports'
              currentTableRef={tableRef.current}
            >
              <ButtonComponent
                btnLabel='Export Report'
                labelStyles='text-lg raleway-b'
                btnColors='primary-blue btn-green hover:opacity-90 transition duration-300 ease-in-out'
                btnStyles='rounded-lg w-auto justify-center lg:w-40'
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
              theadTrGridStyles='grid grid-cols-[repeat(2,_1fr)] sm:grid-cols-[repeat(3,_1fr)] justify-evenly gap-5 items-center h-16'
              tbodyTrGridStyles='grid grid-cols-[repeat(2,_1fr)] sm:grid-cols-[repeat(3,_1fr)] justify-evenly gap-5 h-14'
              tableStyles='w-full table-auto min-w-full max-w-fit'
              theadItems={
                theadOrdersNotAssigendToDriverWithNoScanIn24HourCountByAging
              }
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
          theadTrGridStyles='grid grid-cols-[repeat(2,_1fr)] sm:grid-cols-[repeat(3,_1fr)] justify-evenly gap-5 items-center h-16'
          tbodyTrGridStyles='grid grid-cols-[repeat(2,_1fr)] sm:grid-cols-[repeat(3,_1fr)] justify-evenly gap-5 h-14'
          theadItems={
            theadOrdersNotAssigendToDriverWithNoScanIn24HourCountByAging
          }
          tableRef={tableRef}
          allItems={allItems}
        />
      </section>
    </MainLayout>
  )
}

export const getServerSideProps = async (ctx) => {
  // const cookies = cookie.parse(ctx.req.headers.cookie || "");
  // const userCookie = cookies?.user_token;
  const store = getStore()
  // if (!!userCookie) {
  // store.dispatch(setAuthentication(true));

  // }

  store.dispatch(setAuthentication(true))

  // await store.dispatch(getDetailedOrderNotAssignedToDriversWithNoScan24CountByAging());
  // await store.dispatch(getTerminals());

  return {
    props: {
      initialState: store.getState(),
    },
  }
}

export default OrdersNotAssigendToDriverWithNoScanIn24HourCountByAging
