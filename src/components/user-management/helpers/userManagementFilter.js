import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCurrentUsersPage } from '@/store/user-management';
 
export const userManagementFilter = () => {

  const dispatch = useAppDispatch();
  const { displayedUsers, usersPerPage, currentUsersPage } = useAppSelector( state => state.usersManagement );

  const [usersFiltered, setUsersFiltered] = useState([]);
  const [searchText, setSearchText] = useState('');

  const usersLength = usersFiltered.length || displayedUsers.length;
  const myUsers = usersFiltered && searchText.length ? usersFiltered : displayedUsers;

  // Get current users.
  const indexOfLastPost = currentUsersPage * usersPerPage;
  const indexOfFirstPost = indexOfLastPost - usersPerPage;
  const currentUsers = myUsers.slice(indexOfFirstPost, indexOfLastPost);
  
  const handleChangePage = (number) => {
    dispatch(setCurrentUsersPage(number));
  };

  const handleSearch = (value) => {
    setSearchText(value);
    setUsersFiltered( () => {
      return displayedUsers.filter( user => {
        return user.first_name?.toLowerCase().includes(value.toLowerCase());
        } );  
      }
    );
    dispatch(setCurrentUsersPage(1));
  };

  useEffect(() => {
    handleSearch(searchText);
  }, [displayedUsers]);

  return {
    currentUsersPage,
    searchText,
    usersFiltered,
    setCurrentUsersPage,
    setSearchText,
    setUsersFiltered,
    currentUsers,
    usersLength,
    handleChangePage,
    handleSearch,
    usersPerPage
  };

};