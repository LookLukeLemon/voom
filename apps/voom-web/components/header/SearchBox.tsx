import React from 'react';
import SearchIcon from 'public/images/search-icon.svg';
import BaseImage from 'components/common/BaseImage';

const SearchBox = () => {
  return (
    <div className="py-6 flex-1 flex justify-end">
      <div className="relative hidden sm:flex">
        <input
          className="rounded-xl text-sm caret-white bg-voom_base_third text-voom_base_secondary pl-16 placeholder-zinc-500 outline-none"
          type="search"
          placeholder="Search by keywords"
        />

        <div className="self-center absolute pl-8">
          <div className="relative h-4 aspect-square">
            <BaseImage src={SearchIcon} objectFit="cover" layout="fill" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
