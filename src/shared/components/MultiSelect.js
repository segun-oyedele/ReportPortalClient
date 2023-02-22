import { useState } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setActive } from '@/store/ui';

export const MultiSelect = ({ terminals, totalSelectedItems = 0, handleSelectedItems, title = 'Filter by DC Segment' }) => {

  const { active } = useAppSelector(state => state.ui);
  const dispatch = useAppDispatch();

  const handleActiveSelectTerminals = () => {
    dispatch(setActive(true));
  }

  return (
    <div className="relative h-full search_bar cursor-default">
      <div
        className="text-[#2C2C2C] raleway-m px-3 py-1 inline-block h-full w-full leading-[43px] relative"
        onClick={ handleActiveSelectTerminals }
      >
        <span className="text-sm text-[#2c2c2c]">{ !!totalSelectedItems ? `${ totalSelectedItems } terminals selected` : title }</span>
        <div className="absolute top-2/4 -translate-y-2/4 right-[15px]">
          <Image
            className={`${ active ? 'rotate-180' : '' } transition-transform duration-300 ease-in-out`}
            src={`${process.env.iisPath}/img/icons/chevron_down_icon.svg`}
            width={12}
            height={7}
            alt="chevron down icon"
          />
        </div>
      </div>
      <div className={`${ active ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0' } z-10 absolute bg-[#F9F9F9] w-full h-96 top-[56px] border-[0.4px] border-[#A1A1A1] transition-all duration-300 ease-in-out overflow-y-scroll select_option`}>
        { terminals?.map(({ terminal_name, terminal_id, selected }, index) => (
          <span
            key={terminal_id}
            onClick={ () => handleSelectedItems(terminal_id) }
            className={`${ selected ? 'bg-blue-400 text-white font-bold' : index % 2 === 0 ? 'bg-slate-200' : 'bg-[#F9F9F9]' } truncate px-1 select-none w-full h-10 inline-block text-center leading-10 select_option`}
            title={terminal_name}
          >{ terminal_name }</span>
        ))}
      </div>
    </div>
  );
};

MultiSelect.propTypes = {
  terminals: PropTypes.array.isRequired,
  totalSelectedItems: PropTypes.number,
  handleSelectedItems: PropTypes.func.isRequired,
  title: PropTypes.string
};