import { useEffect, useMemo, useState } from "react";
import moment from "moment/moment";
import { setCurrentItemsPage } from "@/store/detailed-report";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getDetailedDriversOrContractorsWithOpenOrdersSummaryCount,
  getDetailedOrderNotAssignedToDriversWithNoScan24CountByAging,
  getDetailedScannedButUndelivered48HourCountByAging,
  getDriverReport,
} from "@/store/detailed-report/thunks";

const regexAging = /^[\d\s,.]*$/;
const initialDate = moment(new Date()).toDate();

export const useFilter = () => {
  const dispatch = useAppDispatch();
  const { activeReport, itemsPerPage, currentPage, terminals } = useAppSelector(
    (state) => state.detailedReport
  );
 
  const [searchText, setSearchText] = useState("");

  const [dateValue, setDateValue] = useState(initialDate);
  const [totalSelectedItems, setTotalSelectedItems] = useState(0);
  const [selectedTerminals, setSelectedTerminals] = useState(terminals);
  const [selectedDriverType, setSelectedDriverType] = useState({
    id: 1,
    name: "Contractor",
    single_name: "C",
  });

  const itemsLength = activeReport.length;
  // Get current users.
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentItems = useMemo(
    () => activeReport?.slice(indexOfFirstPost, indexOfLastPost),
    [activeReport, indexOfFirstPost, indexOfLastPost]
  );

  useEffect(() => {
    setSelectedTerminals(terminals);
  }, [terminals]);

  const handleSelectedItems = (terminal_id, dcSegment) => {
    setSelectedTerminals((terminals) => {
      const newTerminals = terminals.map((terminal) => {
        if (!dcSegment && terminal.terminal_id === terminal_id) {
          setTotalSelectedItems((totalSelectedItems) => {
            if (terminal.selected) {
              return totalSelectedItems - 1;
            } else {
              return totalSelectedItems + 1;
            }
          });
          return { ...terminal, selected: !terminal.selected };
        } else if (dcSegment && terminal.dc_segment_id === terminal_id){
          setTotalSelectedItems((totalSelectedItems) => {
            if (terminal.selected) {
              return totalSelectedItems - 1;
            } else {
              return totalSelectedItems + 1;
            }
          });
          return { ...terminal, selected: !terminal.selected };
        }
        return terminal;
      });
      return newTerminals;
    });
  };

  const handleChangePage = (number) => {
    dispatch(setCurrentItemsPage(number));
  };

  const onDateChange = (value) => {
    setDateValue(value);
  };

  const handleSearch = (value) => {
    if (!regexAging.test(value)) return;
    setSearchText(value);
  };

  const handleSubmitFilter = async (is48HourOr24) => {
    const aging_threshold = moment(dateValue).format("YYYY-MM-DD");
    const dc_segment_filtered = selectedTerminals
      ?.filter((terminal) => terminal.selected)
      .map((terminal) => terminal.dc_segment_id);
    const dc_segment =
      dc_segment_filtered?.length > 0 ? dc_segment_filtered : null;
    const account_number =
      searchText.trim().length > 0
        ? searchText?.split(",").map((item) => item.trim())
        : null;

    const finalBody = {
      dc_segment,
      aging_threshold,
      account_number,
    };

    if (is48HourOr24.toLowerCase() === "is48") {
      await dispatch(
        getDetailedScannedButUndelivered48HourCountByAging(finalBody)
      );
    } else if (is48HourOr24.toLowerCase() === "is24") {
      await dispatch(
        getDetailedOrderNotAssignedToDriversWithNoScan24CountByAging(finalBody)
      );
    }
    handleChangePage(1);
  };

  const handleSubmitFilterOpenOrders = async () => {
    const dc_segment_filtered = selectedTerminals
      ?.filter((terminal) => terminal.selected)
      .map((terminal) => terminal.terminal_id);
    const driver_dc =
      dc_segment_filtered?.length > 0 ? dc_segment_filtered : null;
    const driver_no =
      searchText.trim().length > 0
        ? searchText?.split(",").map((item) => item.trim())
        : null;

    const finalBody = {
      driver_dc,
      driver_no,
    };

    await dispatch(
      getDetailedDriversOrContractorsWithOpenOrdersSummaryCount(finalBody)
    );
    handleChangePage(1);
  };

  const handleChangeDriverType = (value) => {
    setSelectedDriverType(value);
  };

  const handleSubmitFilterDriverReport = async () => {
    const target_date = moment(dateValue).format("YYYY-MM-DD");
    const driver_center_filtered = selectedTerminals
      ?.filter((terminal) => terminal.selected)
      .map((terminal) => terminal.terminal_id);
    const driver_center =
      driver_center_filtered.length > 0 ? driver_center_filtered : null;
    const driver_type = selectedDriverType?.single_name
      ? selectedDriverType?.single_name
      : null;
    const driver_numbers =
      searchText.trim().length > 0
        ? searchText?.split(",").map((item) => parseInt(item.trim()))
        : null;

    const finalBody = {
      driver_center,
      driver_type,
      target_date,
      driver_numbers,
    };
    await dispatch(getDriverReport(finalBody));
    handleChangePage(1);
  };

  return {
    currentPage,
    searchText,
    setSearchText,
    currentItems,
    itemsLength,
    handleChangePage,
    handleSearch,
    itemsPerPage,
    allItems: activeReport,
    dateValue,
    onDateChange,
    totalSelectedItems,
    selectedTerminals,
    handleSelectedItems,
    handleSubmitFilter,
    handleSubmitFilterOpenOrders,
    handleSubmitFilterDriverReport,
    handleChangeDriverType,
    selectedDriverType,
  };
};
