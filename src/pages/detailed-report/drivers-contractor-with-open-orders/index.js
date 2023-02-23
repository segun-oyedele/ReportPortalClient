import { useEffect, useRef } from "react"
import cookie from "cookie"
import { DownloadTableExcel } from "react-export-table-to-excel"

import {
  DownloadTable,
  Table,
} from "@/components/detailed-report/drivers-contractor-with-open-orders/components"
import {
  getDetailedDriversOrContractorsWithOpenOrdersSummaryCount,
  getDCTerminals,
} from "@/store/detailed-report/thunks"
import { theadDriversContractorWithOpenOrders } from "@/components/detailed-report/data"
import {
  ButtonComponent,
  GoBackButton,
  LoadingComponent,
  MainLayout,
  MultiSelect,
  PageTitle,
  SearchBar,
} from "@/shared/components"
import { Pagination } from "@/shared/components/Pagination"
import { useFilter } from "@/components/detailed-report"
import getStore from "@/store/store"
import { setAuthentication } from "@/store/user"
import { useAppSelector } from "@/store/hooks"
import { useDispatch } from "react-redux"

const DriversContractorWithOpenOrders = () => {
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
    handleSubmitFilterOpenOrders,
  } = useFilter()

  const tableRef = useRef(null)

  const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(getDetailedDriversOrContractorsWithOpenOrdersSummaryCount());
  //   dispatch(getDCTerminals());
  // }, []);

  const { loadingTerminals } = useAppSelector((state) => state.detailedReport)

  return (
    <MainLayout title='Detailed Report | Driver'>
      <GoBackButton />

      <section className='relative flex flex-col items-center justify-between gap-6 px-5 mb-10 lg:flex-row md:px-0 md:mb-10 filter_bar'>
        <PageTitle
          title='Drivers Contractor With Open Orders'
          stylesClass='text-xl raleway-b'
        />

        <div className='flex flex-col w-full gap-6 lg:w-auto lg:flex-row lg:justify-evenly detailed__report-searchbar'>
          <SearchBar
            handleSearch={handleSearch}
            searchText={searchText}
            placeholderText='Search by Driver Number'
            inputStyles='h-full w-full resize-none'
            stylesContainer='w-full lg:w-96 2xl:w-[536px]'
            isTextarea
          />

          <div className='grid grid-rows-2 w-full gap-6 lg:w-[243px] detailed__report-filter'>
            <MultiSelect
              terminals={selectedTerminals}
              totalSelectedItems={totalSelectedItems}
              handleSelectedItems={handleSelectedItems}
              title='Filter by Driver DC'
            />
          </div>

          <div className='flex flex-col w-full gap-6 lg:w-40'>
            <ButtonComponent
              btnLabel='Filter'
              labelStyles='text-lg raleway-b'
              btnColors='primary-blue hover:opacity-90 transition duration-300 ease-in-out'
              btnStyles='rounded-lg w-auto justify-center lg:w-40'
              onClick={handleSubmitFilterOpenOrders}
            />

            <DownloadTableExcel
              filename='Drivers Contractor With Open Orders'
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
              theadTrGridStyles='grid grid-cols-[repeat(3,_1fr)] justify-evenly gap-5 items-center h-16'
              tbodyTrGridStyles='grid grid-cols-[repeat(3,_1fr)] justify-evenly gap-5 h-14'
              tableStyles='w-full table-auto min-w-full max-w-fit'
              theadItems={theadDriversContractorWithOpenOrders}
              tbodyItems={currentItems}
              allItems={allItems}
              tableRef={tableRef}
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
          theadTrGridStyles='grid grid-cols-[repeat(3,_1fr)] justify-evenly gap-5 items-center h-16'
          tbodyTrGridStyles='grid grid-cols-[repeat(3,_1fr)] justify-evenly gap-5 h-14'
          theadItems={theadDriversContractorWithOpenOrders}
          allItems={allItems}
          tableRef={tableRef}
        />
      </section>
    </MainLayout>
  )
}

export const getServerSideProps = async (ctx) => {
  const cookies = cookie.parse(ctx.req.headers.cookie || "")
  const userCookie = cookies?.user_token
  const store = getStore()
  if (!!userCookie) {
    store.dispatch(setAuthentication(true))
  }

  await store.dispatch(
    getDetailedDriversOrContractorsWithOpenOrdersSummaryCount()
  )
  await store.dispatch(getDCTerminals())

  return {
    props: {
      initialState: store.getState(),
    },
  }
}

export default DriversContractorWithOpenOrders
