import BaseImage from 'components/common/BaseImage';
import { myPeerStreamsAtom } from 'common/store/room';
import { useAtomValue, useSetAtom } from 'jotai';
import React from 'react';
import VideoRatioScreen from './VideoRatioScreen';
import AnonymousImage from 'public/images/anonymous.svg';

const RemoteScreen = () => {
  const peerStreamsMap = useAtomValue(myPeerStreamsAtom);
  const setPeerStreamsMap = useSetAtom(myPeerStreamsAtom);

  const handleVisibleChange = (id: string, visible: boolean) => {
    const peerState = peerStreamsMap.get(id);
    if (!peerState) return;
    peerState.stream
      .getVideoTracks()
      .forEach((track) => (track.enabled = visible));
    peerState.isVisible = visible;
    peerStreamsMap.set(id, { ...peerState });
    setPeerStreamsMap(new Map(peerStreamsMap));
  };

  const handleMuteChange = (id: string, mute: boolean) => {
    const peerState = peerStreamsMap.get(id);
    if (!peerState) return;
    peerState.stream
      .getAudioTracks()
      .forEach((track) => (track.enabled = mute));
    peerState.isMuted = mute;
    peerStreamsMap.set(id, { ...peerState });
    setPeerStreamsMap(new Map(peerStreamsMap));
  };

  return (
    <div className="flex gap-4 sm:gap-6 mx-4 sm:mx-6 min-h-[200px]">
      {[...peerStreamsMap.entries()].map(([key, value]) => {
        const { stream, isVisible, isMuted } = value;

        return (
          <VideoRatioScreen
            key={key}
            mediaStream={stream}
            isMuted={isMuted}
            isVisible={isVisible}
            onVisible={(visible) => handleVisibleChange(key, visible)}
            onMuted={(mute) => handleMuteChange(key, mute)}
          />
        );
      })}

      <div className="rounded-xl bg-voom_base_primary w-full h-full flex justify-center items-center">
        <div className="relative w-16 h-16">
          <BaseImage src={AnonymousImage} layout="fill" objectFit="contain" />
        </div>
      </div>
      <div className="rounded-xl bg-voom_base_primary w-full h-full flex justify-center items-center">
        <div className="relative w-16 h-16">
          <BaseImage src={AnonymousImage} layout="fill" objectFit="contain" />
        </div>
      </div>
    </div>
  );
};

export default RemoteScreen;
