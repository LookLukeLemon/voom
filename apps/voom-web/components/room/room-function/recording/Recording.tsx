import { isRecordingAtom } from 'common/store/room';
import FadeSelect from 'components/common/FadeSelect/FadeSelect';
import { useAtomValue, useSetAtom } from 'jotai';
import React from 'react';

const recordingItems = [
  {
    image: (
      <svg className="w-full h-full top-0 left-0 absolute ">
        <circle cx="50%" cy="50%" r="50%" className="fill-white" />
        <circle
          cx="50%"
          cy="50%"
          r="35%"
          strokeWidth={2.5}
          className="fill-white stroke-voom_base_third"
        />
      </svg>
    ),
    value: false,
  },
  {
    image: (
      <svg className="w-full h-full top-0 left-0 absolute ">
        <circle cx="50%" cy="50%" r="50%" className="fill-white" />
        <circle
          cx="50%"
          cy="50%"
          r="35%"
          strokeWidth={2.5}
          className="fill-white stroke-voom_base_third"
        />
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
    ),
    value: true,
  },
];

const Recording = () => {
  const isRecording = useAtomValue(isRecordingAtom);
  const setIsRecording = useSetAtom(isRecordingAtom);
  const selectedItem = isRecording ? recordingItems[1] : recordingItems[0];

  return (
    <FadeSelect
      items={recordingItems}
      selectedItem={selectedItem}
      onChange={(itemValue) => {
        setIsRecording(Boolean(itemValue));
      }}
    />
  );
};

export default Recording;
