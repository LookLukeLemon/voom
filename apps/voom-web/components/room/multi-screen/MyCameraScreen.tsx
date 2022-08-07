import { isMyCameraMutedAtom, isMyCameraVisibleAtom } from 'common/store/room';
import { CameraScreenType } from 'common/types';
import CameraButton from 'components/common/CameraButton/CameraButton';
import MuteButton from 'components/common/MuteButton/MuteButton';
import useRoom from 'hooks/useRoom';
import useWebRTC from 'hooks/useWebRTC';
import { useAtomValue } from 'jotai';
import React, { useEffect, useRef } from 'react';
import useMyCamera from './useMyCamera';

const MyCameraScreenCore = ({
  mediaStream,
  onChangeVisible,
  onChangeMuted,
}: CameraScreenType) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  // FIXME: change nickname after auth
  const nickname = 'Nicolas';
  const isMyCameraMuted = useAtomValue(isMyCameraMutedAtom);
  const isMyCameraVisible = useAtomValue(isMyCameraVisibleAtom);

  useEffect(() => {
    if (videoRef.current && mediaStream) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [mediaStream]);

  return (
    <div className="relative rounded-xl h-full w-full overflow-hidden border border-zinc-900">
      <video
        muted={isMyCameraMuted}
        className="absolute left-0 top-0 aspect-video h-full w-full object-cover"
        ref={videoRef}
        autoPlay
        playsInline
      />

      <div className="absolute w-full bottom-0">
        <div className="absolute left-4 bottom-4 flex gap-4 bg-voom_base_third/80 rounded-xl h-12 px-4 items-center justify-center text-sm">
          <h5>{nickname}</h5>
          <div className="rounded-full w-2 h-2 bg-green-500" />
        </div>
        <div className="absolute right-4 bottom-4 flex gap-4">
          <CameraButton
            isVisible={isMyCameraVisible}
            onChange={onChangeVisible}
          />
          <MuteButton isMuted={isMyCameraMuted} onChange={onChangeMuted} />
        </div>
      </div>
    </div>
  );
};

const MyCameraScreen = () => {
  const { myStream, onChangeMyCameraMuted, onChangeMyCameraVisible } =
    useMyCamera();

  const { myPeerConn } = useWebRTC();

  const handleReceiveEntered = (payload: any) => {
    console.log('mypeer', myPeerConn);
  };

  const { onLeaveRoom } = useRoom({
    onReceiveEntered: handleReceiveEntered,
  });

  return (
    <MyCameraScreenCore
      mediaStream={myStream}
      onChangeVisible={onChangeMyCameraVisible}
      onChangeMuted={onChangeMyCameraMuted}
    />
  );
};

export default MyCameraScreen;
