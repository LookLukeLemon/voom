import { peerStreamsMapAtom } from 'common/store/room';
import { useAtomValue, useSetAtom } from 'jotai';
import React from 'react';
import VideoRatioScreen from './VideoRatioScreen';

const RemoteScreen = () => {
  const peerStreamsMap = useAtomValue(peerStreamsMapAtom);
  const setPeerStreamsMap = useSetAtom(peerStreamsMapAtom);

  const handleVisibleChange = (id: string, visible: boolean) => {
    // const peerState = peerStreamsMap.get(id);
    // if (!peerState) return;
    // peerState.stream
    //   .getVideoTracks()
    //   .forEach((track) => (track.enabled = visible));
    // peerState.isVisible = visible;
    // peerStreamsMap.set(id, { ...peerState });
    // setPeerStreamsMap(new Map(peerStreamsMap));
  };

  return (
    <div className="flex gap-6 mx-6 min-h-[200px]">
      {[...peerStreamsMap.values()].map((peerState) => {
        const { stream, isVisible, isMuted } = peerState;

        return (
          <VideoRatioScreen
            key={stream.id}
            mediaStream={stream}
            isMuted={isMuted}
            isVisible={isVisible}
            onVisible={(visible) => handleVisibleChange(stream.id, visible)}
            onMuted={() => {
              return;
            }}
          />
        );
      })}
    </div>
  );
};

export default RemoteScreen;
