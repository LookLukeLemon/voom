import { CHAT_CHANNEL } from 'common/Constants';
import { isMyCameraMutedAtom, isMyCameraVisibleAtom } from 'common/store/room';
import { CameraScreenType, EnteredLeavedPayload } from 'common/types';
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
  const nickname = 'Luke';
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

      <div className="w-full flex items-end justify-between h-full gap-4 absolute">
        <div className="truncate mb-4 ml-4 flex gap-4 bg-voom_base_third/80 rounded-xl h-12 px-4 items-center justify-center text-sm">
          <h5 className="flex-1 truncate">{nickname}</h5>
          <div className="rounded-full w-2 h-2 bg-green-500" />
        </div>
        <div className="mr-4 mb-4 flex gap-4">
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

const MyCameraScreen = ({ roomName }: { roomName: string }) => {
  const { myStream, onChangeMyCameraMuted, onChangeMyCameraVisible } =
    useMyCamera();

  const { makePeerConnection, makeDataChannel, sendOffer } =
    useWebRTC(myStream);

  const handleReceiveEntered = async (payload: EnteredLeavedPayload) => {
    const peerConn = makePeerConnection(payload.socketId);
    if (!peerConn) return;

    makeDataChannel(payload.socketId, peerConn, CHAT_CHANNEL);
    const offer = await peerConn.createOffer();
    await peerConn.setLocalDescription(offer);
    sendOffer({ payload: offer, roomName, socketId: payload.socketId });
  };

  useRoom({
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
