import BaseImage from 'common/BaseImage';
import { HomeFunctionProps } from 'common/types';
import React from 'react';

const FunctionItem = (props: HomeFunctionProps) => {
  const { title, desc, image, onClick } = props;
  return (
    <li
      className="cursor-pointer grid grid-rows-2 aspect-square first:bg-voom_secondary bg-voom_primary rounded-xl text-white p-4 sm:p-6"
      onClick={onClick}
    >
      <div className="bg-white/20 rounded-xl w-fit h-fit aspect-square p-4 border border-white/20">
        <div className="relative h-6 lg:h-8 aspect-square">
          <BaseImage src={image} layout="fill" objectFit="contain" />
        </div>
      </div>
      <div className="flex flex-col gap-2 justify-end">
        <h2 className="text-xs sm:text-base font-semibold">{title}</h2>
        <p className="hidden sm:block text-xs sm:text-sm text-white/70">
          {desc}
        </p>
      </div>
    </li>
  );
};

export default FunctionItem;
