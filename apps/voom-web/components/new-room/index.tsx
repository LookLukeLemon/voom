import BaseImage from 'components/common/BaseImage';
import React, { useRef } from 'react';
import AvatarImage from 'public/images/avatar.svg';
import { InformationCircleIcon } from '@heroicons/react/outline';
import {
  ACTION_CREATE_ROOM,
  INFO_CREATE_ROOM,
  TITLE_CREATE_ROOM,
} from 'common/Constants';
import useRoom from 'hooks/useRoom';

const NewRoom = () => {
  const roomNameRef = useRef<HTMLInputElement>(null);
  const { onJoinRoom } = useRoom({});
  const handleClickJoin = () => {
    if (!roomNameRef || !roomNameRef.current || !roomNameRef.current.value)
      return;

    onJoinRoom(roomNameRef.current.value);
  };

  return (
    <div className="gap-4 sm:gap-6 flex flex-col p-4 sm:p-6 w-fit">
      <div className="flex flex-col gap-1">
        <h1 className="text-base font-semibold text-white">
          {TITLE_CREATE_ROOM}
        </h1>
        <div className="flex items-center gap-1 text-zinc-400 text-xs">
          <InformationCircleIcon className="h-3.5 self-start" />
          <p>{INFO_CREATE_ROOM}</p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        <div className="flex gap-4 sm:gap-6">
          <div className="relative h-12 aspect-square rounded-xl overflow-hidden">
            <BaseImage src={AvatarImage} layout="fill" objectFit="cover" />
          </div>

          <input
            ref={roomNameRef}
            name="room_name"
            placeholder="Title goes here"
            className="border-zinc-400 w-[100px] sm:w-full rounded-xl border flex-1 px-4 sm:px-6 outline-none"
          />
        </div>
        <button
          className="bg-voom_primary px-4 py-3 rounded-xl text-white text-sm"
          onClick={handleClickJoin}
        >
          {ACTION_CREATE_ROOM}
        </button>
      </div>
    </div>
  );
};

export default NewRoom;
