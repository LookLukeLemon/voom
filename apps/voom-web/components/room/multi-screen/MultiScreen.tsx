import React, { useState } from 'react';
import MyCameraScreen from './MyCameraScreen';

const MultiScreen = () => {
  //   let peerConn: RTCPeerConnection;

  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  //   const makePeerConnection = (mediaStream: MediaStream | undefined) => {
  //     const myPeerConn = new RTCPeerConnection();
  //     mediaStream
  //       ?.getTracks()
  //       .forEach((track) => myPeerConn.addTrack(track, mediaStream));

  //     peerConn = myPeerConn;
  //     return myPeerConn;
  //   };

  //   const fetchDevices = async () => {
  //     try {
  //       const devices = await navigator.mediaDevices.enumerateDevices();
  //       const cameras = devices.filter((d) => d.kind === 'videoinput');
  //       setVideoDevices(cameras);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   const getPrerequisite = async () => {
  // await fetchDevices();
  // const mediaStream = await fetchMedia();
  // const myPeerConn = makePeerConnection(mediaStream);
  // socket.emit('join_room', 'wanna join');
  //   };

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
