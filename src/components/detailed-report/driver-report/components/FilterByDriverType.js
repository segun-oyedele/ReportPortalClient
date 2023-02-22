import PropTypes from 'prop-types';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/solid';
import { Fragment } from 'react';
import Image from 'next/image';

const options = [
  { id: 2, name: 'Employee', single_name: 'E' },
  { id: 1, name: 'Contractor', single_name: 'C' }
];

export const FilterByDriverType = ({ handleChangeDriverType, selectedDriverType }) => {

  return (
    <div className="search_bar filter__button">
      <Listbox value={selectedDriverType} onChange={handleChangeDriverType}>
        <div className="relative h-full">
          <Listbox.Button className="relative w-full h-full py-2 pl-3 text-lg text-left cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block h-full leading-8 table_text-black raleway-m">{ selectedDriverType?.name || 'Filter by Driver Type'}</span>
            <span className="absolute inset-y-0 flex items-center pointer-events-none right-[15px]">
              <Image
                src="/img/icons/chevron_down_icon.svg"
                alt="chevron-down"
                width={12}
                height={7}
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-8 pr-4 h-12 leading-8 ${
                      active ? 'bg-slate-100' : 'text-gray-900'
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {option.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-black">
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

FilterByDriverType.propTypes = {
  handleChangeDriverType: PropTypes.func.isRequired,
  selectedDriverType: PropTypes.object.isRequired
}