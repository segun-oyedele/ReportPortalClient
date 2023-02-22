import { useState } from 'react';
import PropTypes from 'prop-types';

import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { addDistribution, setActiveGroup, setOpenGroupForm, updateDistribution } from '@/store/distribution-list';
import { alertPopup } from '../helpers';

const initialErrorValues = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  groupName: ''
}

const nameRegex = /^[A-zÀ-ÿ ]*$/;
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export const useForm = (initialState = {}) => {

  const dispatch = useAppDispatch();
  const { activeGroup } = useAppSelector(state => state.distributionList);
  const { distribution_name, portal_distribution_id, email: activeEmail, active } = !!activeGroup ? activeGroup : {};
  const [values, setValues] = useState(!!activeGroup ? { groupName: distribution_name, portal_distribution_id, email: activeEmail, active } : initialState);
  const [formErrors, setFormErrors] = useState(initialErrorValues);
  const { email, password, firstName, lastName, groupName } = formErrors;

  const reset = () => {
    setValues(initialState);
    setFormErrors(initialErrorValues);
  }

  const handleEmailChange = (e) => {
    const { value } = e.target;

    setValues({
      ...values,
      email: value
    });

    const match = value.toLowerCase().match(emailRegex)

    if (!match && value.length > 0) {
      setFormErrors({
        ...formErrors,
        email: 'This email is invalid'
      });
    } else {
      setFormErrors({
        ...formErrors,
        email: ''
      });
    }

  };

  const handleNameChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value
    });

    const match = value.toLowerCase().match(nameRegex);

    if (!match && value.length > 0) {
      setFormErrors({
        ...formErrors,
        [name]: 'First name must contain only letters'
      });
    } else {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }

  };

  const handleGroupNameChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value
    });

    const match = value.toLowerCase().match(nameRegex);

    if (!match && value.length > 0) {
      setFormErrors({
        ...formErrors,
        [name]: 'Group name must contain only letters'
      });
    } else {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }

  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;

    setValues({
      ...values,
      password: value
    });

    if (value.length < 7) {
      setFormErrors({
        ...formErrors,
        password: 'Password must be at least 8 characters long'
      });
    } else {
      setFormErrors({
        ...formErrors,
        password: ''
      });
    }

  };

  const handleSaveGroup = async (e) => {
    e.preventDefault();
    const { email, groupName: distribution_name, portal_distribution_id, active } = values;
    const finalGroup = { email, distribution_name, portal_distribution_id, active };

    if (!!activeGroup) {
      const { payload } = await dispatch(updateDistribution(finalGroup));

      if (payload) {
        alertPopup('Group updated successfully');
      } else {
        alertPopup('Group could not be updated', 'error');
      }

    } else {
      const { portal_distribution_id, active, ...rest } = finalGroup;

      const { payload } = await dispatch(addDistribution({ ...rest }));

      if (payload) {
        alertPopup('Group added successfully');
      } else {
        alertPopup('Group could not be added', 'error');
      }

    }

    reset();
    dispatch(setOpenGroupForm(false));
    dispatch(setActiveGroup());
  }

  return { formValues: values, handleNameChange, handleEmailChange, handlePasswordChange, handleGroupNameChange, reset, emailError: email, passwordError: password, firstNameError: firstName, lastNameError: lastName, groupNameError: groupName, handleSaveGroup };

};

useForm.propTypes = {
  initialState: PropTypes.object
};