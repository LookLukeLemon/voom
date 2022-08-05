import React, { useState } from 'react';
import Chat from './chat/Chat';
import ChatAction from './chat-action/ChatAction';
import MultiScreen from './multi-screen/MultiScreen';
import Participants from './participants/Participants';
import RoomFunction from './room-function/RoomFunction';

const Room = ({ roomName }: { roomName: string }) => {
  // const handleMute = () => {
  //   if (!myStream) return;

  //   myStream.getAudioTracks().forEach((track) => {
  //     track.enabled = !track.enabled;
  //     setIsMuted(track.enabled);
  //   });
  // };

  // const handleShow = () => {
  //   if (!myStream) return;

  //   myStream.getVideoTracks().forEach((track) => {
  //     track.enabled = !track.enabled;
  //     setIsShow(track.enabled);
  //   });
  // };

  return (
    <div className="flex text-white h-full divide-x divide-voom_base_third">
      <div className="flex-1 flex flex-col divide-y divide-voom_base_third">
        <div className="flex-1">
          <MultiScreen />
        </div>
        <RoomFunction />
      </div>
      <div className="w-96 flex flex-col divide-y divide-voom_base_third">
        <div className="flex-1 flex flex-col">
          <Participants />
          <Chat />
        </div>
        <ChatAction />
      </div>
    </div>
  );
};

export default Room;
