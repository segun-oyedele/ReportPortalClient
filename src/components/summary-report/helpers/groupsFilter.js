import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCurrentGroupPage } from '@/store/summary-report';
import { useEffect, useState } from 'react';
 
export const groupsFilter = () => {

  const dispatch = useAppDispatch();
  const { groups, groupsPerPage, currentGroupPage, distributions, reports } = useAppSelector( state => state.summaryReport );
  const finalGroups = groups.map( group => {
    const distribution = distributions.find( distribution => distribution.portal_distribution_id === group.distribution_id );
    const report = reports.find( report => report.portal_summary_report_type_id === group.report_type_id );
    return {
      ...group,
      distribution_name: distribution ? distribution.distribution_name : '',
      distribution_id: group.distribution_id,
      report_name: report ? report.report_name : '',
    }
  });

  const [groupsFiltered, setGroupsFiltered] = useState([]);
  const [searchText, setSearchText] = useState('');

  const groupsLength = groupsFiltered.length || groups.length;
  const myGroups = groupsFiltered && searchText.length ? groupsFiltered : finalGroups;

  // Get current groups.
  const indexOfLastPost = currentGroupPage * groupsPerPage;
  const indexOfFirstPost = indexOfLastPost - groupsPerPage;
  const currentGroups = myGroups.slice(indexOfFirstPost, indexOfLastPost);
  
  const handleChangePage = (number) => {
    dispatch(setCurrentGroupPage(number));
  };

  const handleSearch = (value) => {
    setSearchText(value);
    setGroupsFiltered( () => {
      return finalGroups.filter( group => {
        return group.email?.toLowerCase().includes(value.toLowerCase());
        } );  
      }
    );
    dispatch(setCurrentGroupPage(1));
  };

  useEffect(() => {
    handleSearch(searchText);
  }, [groups]);

  return {
    currentGroupPage,
    searchText,
    groupsFiltered,
    setCurrentGroupPage,
    setSearchText,
    setGroupsFiltered,
    currentGroups,
    groupsLength,
    handleChangePage,
    handleSearch,
    groupsPerPage
  };

};