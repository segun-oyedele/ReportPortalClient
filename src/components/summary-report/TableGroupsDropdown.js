import { setGroupToDelete, setOpenGroupDeleteForm } from '@/store/summary-report';
import { DotsVerticalIcon } from '@heroicons/react/solid';
import { Menu, Transition } from '@headlessui/react';
import { useAppDispatch } from '@/store/hooks';
import PropTypes from 'prop-types';
import { Fragment } from 'react';
import Image from 'next/image';

export const TableGroupsDropdown = ({handleEditGroup, group}) => {

  const dispatch = useAppDispatch();

  return (
    <div className="text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full py-2 text-sm font-medium rounded-md hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <DotsVerticalIcon className="w-6 h-6 text-black" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg w-52 ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 mb-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active ? 'bg-gray-100 text-black' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-3 py-2 text-lg raleway-m gap-x-2`}
                    onClick={ () => handleEditGroup(group) }
                  >
                    <Image
                      src={`${process.env.iisPath}/img/icons/edit_icon.svg`}
                      alt='edit'
                      width={18}
                      height={18}
                    />
                    Edit Summary
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1 border-none">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active ? 'bg-gray-100 text-black' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-3 py-2 text-lg raleway-m gap-x-2`}
                    onClick={ () => {
                      dispatch(setGroupToDelete(group))
                      dispatch(setOpenGroupDeleteForm(true))
                    } }
                  >
                    <Image
                      src={`${process.env.iisPath}/img/icons/trash_icon.svg`}
                      alt='delete'
                      width={24}
                      height={24}
                    />
                    Delete
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

TableGroupsDropdown.propTypes = {
  handleEditGroup: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired
}