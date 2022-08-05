import { MicrophoneIcon, VideoCameraIcon } from '@heroicons/react/solid';
import BaseImage from 'common/BaseImage';
import AvatarImage from 'public/images/avatar.svg';
import React from 'react';

const ParticipantItem = () => {
  return (
    <li className="flex gap-4 p-3 rounded-xl text-sm items-center text-white/70">
      <div className="relative h-10 aspect-square rounded-xl overflow-hidden">
        <BaseImage src={AvatarImage} layout="fill" objectFit="cover" />
      </div>
      <span className="flex-1 font-semibold truncate">Laura Williams</span>
      <MicrophoneIcon className="h-5 w-5" />
      <VideoCameraIcon className="h-5 w-5" />
    </li>
  );
};

export default ParticipantItem;
