import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';

export const InputSelect = ({ distributionSelected, distributions, handleChangeDistribution }) => {

  const [selected, setSelected] = useState(distributionSelected);

  const handleChangeSelected = (option) => {
    handleChangeDistribution(option);
    setSelected(option);
  }

  return (
    <div className="w-full">
      <Listbox value={selected} onChange={handleChangeSelected}>
        <div className="relative mt-1 z-10">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg form__input cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm">
            <span className="block truncate">{selected.distribution_name}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronDownIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {distributions.map((distribution, distributionIdx) => (
                <Listbox.Option
                  key={distributionIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-blue-400 text-white' : 'text-gray-900'
                    }`
                  }
                  value={distribution}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {distribution.distribution_name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-900">
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

InputSelect.propTypes = {
  distributionSelected: PropTypes.object.isRequired,
  distributions: PropTypes.array.isRequired,
  handleChangeDistribution: PropTypes.func.isRequired
}