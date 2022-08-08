import React from 'react';
import MyCameraScreen from './MyCameraScreen';
import RemoteScreen from './RemoteScreen';

const MultiScreen = ({ roomName }: { roomName: string }) => {
  return (
    <div className="flex flex-col gap-6 py-6 bg-black h-full">
      <div className="flex-1 mx-6 flex justify-center">
        <MyCameraScreen roomName={roomName} />
      </div>

      <RemoteScreen />
    </div>
  );
};

export default MultiScreen;
