import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCurrentGroupPage } from '@/store/distribution-list';
 
export const groupsFilter = () => {

  const dispatch = useAppDispatch();
  const { groups, groupsPerPage, currentGroupPage } = useAppSelector( state => state.distributionList );

  const [groupsFiltered, setGroupsFiltered] = useState([]);
  const [searchText, setSearchText] = useState('');

  const groupsLength = groupsFiltered.length || groups.length;
  const myGroups = groupsFiltered.length > 0 && searchText.length ? groupsFiltered : groups;

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
      return groups.filter( group => {
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