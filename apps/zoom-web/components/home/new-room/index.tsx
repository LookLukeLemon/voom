import BaseImage from 'common/BaseImage';
import FadePopup from 'components/common/FadePopup';
import React, { memo, useRef } from 'react';
import AvatarImage from 'public/images/avatar.svg';
import { InformationCircleIcon } from '@heroicons/react/outline';
import {
  ACTION_CREATE_ROOM,
  INFO_CREATE_ROOM,
  TITLE_CREATE_ROOM,
} from 'common/Constants';

const NewRoom = ({
  isOpen,
  onIsOpen,
  onCreateRoom,
}: {
  isOpen: boolean;
  onIsOpen: (isOpen: boolean) => void;
  onCreateRoom: (roomName: string) => void;
}) => {
  const roomNameRef = useRef<HTMLInputElement>(null);
  const handleClickJoin = () => {
    if (!roomNameRef || !roomNameRef.current || !roomNameRef.current.value)
      return;

    onCreateRoom(roomNameRef.current.value);
  };

  return (
    <FadePopup isOpen={isOpen} onIsOpen={onIsOpen}>
      <div className="gap-6 flex flex-col p-6 w-fit">
        <div className="flex flex-col gap-1">
          <h1 className="text-base font-semibold">{TITLE_CREATE_ROOM}</h1>
          <div className="flex items-center gap-1 text-zinc-400 text-xs">
            <InformationCircleIcon className="h-3.5" />
            <p>{INFO_CREATE_ROOM}</p>
          </div>
        </div>
        <div className="flex gap-6">
          <div className="relative h-12 aspect-square rounded-xl overflow-hidden">
            <BaseImage src={AvatarImage} layout="fill" objectFit="cover" />
          </div>

          <input
            ref={roomNameRef}
            name="room_name"
            placeholder="Title goes here"
            className="border-zinc-400 rounded-xl border flex-1 px-6 outline-none"
          />

          <button
            className="bg-voom_primary px-4 py-3 rounded-xl text-white"
            onClick={handleClickJoin}
          >
            {ACTION_CREATE_ROOM}
          </button>
        </div>
      </div>
    </FadePopup>
  );
};

export default memo(NewRoom);
