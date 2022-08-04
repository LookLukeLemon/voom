import { MicrophoneIcon } from '@heroicons/react/solid';
import { isMutedAtom } from 'common/store/room';
import FadeSelect from 'components/common/FadeSelect/FadeSelect';
import { useAtomValue, useSetAtom } from 'jotai';
import React from 'react';

const muteItems = [
  { image: <MicrophoneIcon />, value: false },
  {
    image: (
      <>
        <MicrophoneIcon className="text-white/70" />
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
    value: true,
  },
];

const Mute = () => {
  const isMuted = useAtomValue(isMutedAtom);
  const setIsMuted = useSetAtom(isMutedAtom);
  const selectedItem = isMuted ? muteItems[1] : muteItems[0];

  return (
    <FadeSelect
      items={muteItems}
      selectedItem={selectedItem}
      onChange={(itemValue) => {
        setIsMuted(Boolean(itemValue));
      }}
    />
  );
};

export default Mute;
