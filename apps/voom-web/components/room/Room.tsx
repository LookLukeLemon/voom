import React, { useEffect, useState } from 'react';
import Chat from './chat/Chat';
import ChatAction from './chat-action/ChatAction';
import MultiScreen from './multi-screen/MultiScreen';
import Participants from './participants/Participants';
import RoomFunction from './room-function/RoomFunction';
import useRoom from 'hooks/useRoom';
import { useAtomValue } from 'jotai';
import { myPeerConnAtom } from 'common/store/room';

const Room = () => {
  return (
    <div className="flex text-white h-full divide-x divide-voom_base_third">
      <div className="flex-1 flex flex-col divide-y divide-voom_base_third">
        <div className="flex-1">
          <MultiScreen />
        </div>

        {/* <RoomFunction roomName={roomName} /> */}
      </div>
      <div className="w-96 flex flex-col divide-y divide-voom_base_third">
        <div className="flex-1 flex flex-col">
          {/* <Participants /> */}
          {/* <Chat /> */}
        </div>
        {/* <ChatAction /> */}
      </div>
    </div>
  );
};

export default Room;
