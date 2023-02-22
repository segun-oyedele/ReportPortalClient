import PropTypes from 'prop-types';
import { Switch } from '@headlessui/react';

export const InputActive = ({ isActive, handleIsActive }) => {
  return (
    <div className="flex items-center justify-between user__form-active">
      <Switch
        checked={ isActive === 1 ? true : false }
        name="isActive"
        onChange={ handleIsActive }
        className={`${isActive ? 'user__form-active-active' : 'form__partner-switch-inactive'
          } relative inline-flex h-5 w-8 items-center rounded-full transition-colors duration-300`}
      >
        <span className="sr-only">Active Partner</span>
        <span
          className="inline-block transition-transform duration-300 transform bg-white rounded-full active__circle"
        />
      </Switch>
    </div>
  );
}

InputActive.propTypes = {
  isActive: PropTypes.number.isRequired,
  handleIsActive: PropTypes.func.isRequired
};