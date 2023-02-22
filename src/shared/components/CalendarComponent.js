import { useState } from 'react';
import PropTypes from 'prop-types';
import DateTimePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CalendarIcon } from '@heroicons/react/solid';


export const CalendarComponent = ({ date, onChangeDate }) => {

  const [open, setOpen] = useState(false);
  
  const handleChange = (date) => {
    onChangeDate(date);
    setOpen(false);
  }

  return (
    <div className="relative"> 
      <DateTimePicker
        selected={date}
        onChange={handleChange}
        onInputClick={() => setOpen(!open)}
        open={open}
      />
      <CalendarIcon
        className="w-6 h-6 absolute top-2/4 -translate-y-2/4 right-3"
        onClick={ () => setOpen(!open) }
      />
    </div>
  )
}

CalendarComponent.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  onChangeDate: PropTypes.func.isRequired
}