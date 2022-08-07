import React from 'react';
import MyCameraScreen from './MyCameraScreen';

const MultiScreen = () => {
  return (
    <div className="flex flex-col gap-6 py-6 bg-black h-full">
      <div className="flex-1 mx-6 flex justify-center">
        <MyCameraScreen />
      </div>

      <div className="flex gap-6 mx-6 min-h-[200px]">
        {/* <VideoRatioScreen mediaStream={myStream} />
        <VideoRatioScreen mediaStream={myStream} />
        <VideoRatioScreen mediaStream={myStream} /> */}
      </div>
    </div>
  );
};

export default MultiScreen;
