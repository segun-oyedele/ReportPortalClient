import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { setActiveUser, setOpenUserForm, updateUserData } from '@/store/user-management';
import { alertPopup } from '@/shared/helpers';

const options = [
  { portal_user_type_id: 'Admin' },
  { portal_user_type_id: 'User' }
];

export const useForm = () => {

  const dispatch = useAppDispatch();
  const { activeUser } = useAppSelector( state => state.usersManagement );
  const [values, setValues] = useState(activeUser);
  const [selected, setSelected] = useState(activeUser.portal_user_type_id === 1 ? options[0] : options[1]);

  const reset = () => {
    setValues({});
  }

  const handleUserTypeChange = (value) => {
    const { portal_user_type_id } = value;

    setSelected(value);

    setValues({
      ...values,
      portal_user_type_id: portal_user_type_id === 'Admin' ? 1 : 2
    });

  };

  const handleIsActive = (status) => {
    setValues({
      ...values,
      active: status ? 1 : 0
    });
  };

  const handleSaveUser = async(e) => {
    e.preventDefault();

    const { payload } = await dispatch(updateUserData(values));

    if (payload) {
      alertPopup('User data successfully saved');
    } else {
      alertPopup('Error saving user data', 'error');
    }

    reset();
    dispatch(setOpenUserForm(false));
    dispatch(setActiveUser());
  }

  return { formValues: values, handleUserTypeChange, reset, handleSaveUser, selected, options, handleIsActive };

};