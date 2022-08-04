import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpIcon, CheckIcon } from '@heroicons/react/solid';
import { classNames } from 'utils';
import { FadeSelectType, SelectItemType } from 'common/types';

const FadeSelect = ({ selectedItem, items, onChange }: FadeSelectType) => {
  return (
    <div>
      <Listbox value={selectedItem.value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button
            className={classNames(
              'relative w-full cursor-pointer rounded-lg bg-voom_base_third ring-1 ring-zinc-700 pl-4 pr-8 text-left h-12 text-white/80 outline-none',
            )}
          >
            <div className="flex items-center gap-2">
              <div className="w-4 aspect-square relative">
                {selectedItem.image}
              </div>
            </div>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpIcon className="h-4" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute bottom-12 mb-1 z-10 max-h-80 w-full overflow-auto rounded-xl bg-voom_base_third ring-1 ring-zinc-700 ">
              {items.map((item: SelectItemType) => (
                <Listbox.Option
                  key={item.value.toString()}
                  className={({ active }) =>
                    `relative cursor-pointer h-12 flex items-center select-none pl-4 pr-4 ${
                      active && 'bg-voom_primary'
                    }`
                  }
                  value={item.value}
                >
                  {({ selected }) => (
                    <>
                      <span className={`flex gap-2 truncate`}>
                        <div className="relative h-4 w-4">{item.image}</div>
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-10">
                          <CheckIcon className="h-3 text-white" />
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

export default FadeSelect;
