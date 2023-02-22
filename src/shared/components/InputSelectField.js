import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/solid';
import PropTypes from 'prop-types';
import { Fragment } from 'react';
import Image from 'next/image';

export const InputSelectField = ({ selected, labelText, handleUserTypeChange, options }) => {
  return (
    <div className="relative w-full">
      <label className="inline-block mb-2 ml-4 form__label">{labelText}</label>
      <Listbox value={selected} onChange={handleUserTypeChange} className="form__input">
        <div className="relative h-full">
          <Listbox.Button className="relative w-full h-full py-2 pl-3 text-lg text-left cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block h-full leading-10 table_text-black raleway-m opacity-60">{selected.portal_user_type_id}</span>
            <span className="absolute inset-y-0 flex items-center pointer-events-none right-8">
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
            <Listbox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option, optionIndex) => (
                <Listbox.Option
                  key={optionIndex}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-gray-100' : 'text-gray-900'
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                          }`}
                      >
                        {option.portal_user_type_id}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-black">
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
  );
};

InputSelectField.propTypes = {
  selected            : PropTypes.object.isRequired,
  labelText           : PropTypes.string.isRequired,
  options             : PropTypes.array.isRequired,
  handleUserTypeChange: PropTypes.func.isRequired,
};