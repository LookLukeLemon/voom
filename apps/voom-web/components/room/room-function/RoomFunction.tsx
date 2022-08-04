import React from 'react';
import Mute from './mute/Mute';
import Recording from './recording/Recording';
import VideoOnOff from './video-on-off/VideoOnOff';

const RoomFunction = () => {
  return (
    <div className="h-24 flex items-center p-6 gap-6">
      <Mute />
      <VideoOnOff />
      <div className="flex-1 flex justify-center items-center text-sm h-full">
        <button className="bg-red-500 rounded-xl px-6 h-full">
          End Meeting
        </button>
      </div>
      <Recording />
      <VideoOnOff />
    </div>
  );
};

export default RoomFunction;
