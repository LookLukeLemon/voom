import { VideoCameraIcon } from '@heroicons/react/solid';
import React from 'react';
import { classNames } from 'utils';

const CameraButton = ({
  isVisible,
  onChange,
}: {
  isVisible: boolean;
  onChange: (isVisible: boolean) => void;
}) => {
  return (
    <button
      className={classNames(
        'h-12 w-12  rounded-xl flex justify-center items-center',
        isVisible ? 'bg-voom_primary' : 'bg-voom_base_third/80',
      )}
      onClick={() => onChange(!isVisible)}
    >
      {isVisible ? (
        <VideoCameraIcon className="h-5 w-5" />
      ) : (
        <div className="h-5 w-5 relative">
          <VideoCameraIcon className="text-white/70" />
          <svg className="w-full h-full top-0 left-0 absolute ">
            <line
              className="stroke-voom_base_third translate-x-0.5"
              x1="0"
              x2="100%"
              y1="10%"
              y2="90%"
              strokeWidth="1.5"
            />
            <line
              className="stroke-white/70 "
              x1="0"
              x2="100%"
              y1="10%"
              y2="90%"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      )}
    </button>
  );
};

export default CameraButton;
