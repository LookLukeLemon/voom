import { VideoCameraIcon } from '@heroicons/react/solid';
import { isMyCameraVisibleAtom } from 'common/store/room';
import FadeSelect from 'components/common/FadeSelect/FadeSelect';
import { useAtomValue, useSetAtom } from 'jotai';
import React from 'react';

const videoItems = [
  { image: <VideoCameraIcon />, value: true },
  {
    image: (
      <>
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
      </>
    ),
    value: false,
  },
];

const VideoOnOff = () => {
  const isMyCameraVisible = useAtomValue(isMyCameraVisibleAtom);
  const setIsMyCameraVisible = useSetAtom(isMyCameraVisibleAtom);
  const selectedItem = isMyCameraVisible ? videoItems[0] : videoItems[1];

  return (
    <FadeSelect
      items={videoItems}
      selectedItem={selectedItem}
      onChange={(itemValue) => {
        setIsMyCameraVisible(Boolean(itemValue));
      }}
    />
  );
};

export default VideoOnOff;
