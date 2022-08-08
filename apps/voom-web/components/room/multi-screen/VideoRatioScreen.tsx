import CameraButton from 'components/common/CameraButton/CameraButton';
import MuteButton from 'components/common/MuteButton/MuteButton';
import React, { useEffect, useRef } from 'react';

const VideoRatioScreen = ({
  mediaStream,
  isVisible,
  isMuted,
  onVisible,
  onMuted,
}: {
  mediaStream: MediaStream | undefined;
  isVisible: boolean;
  isMuted: boolean;
  onVisible: (isVisible: boolean) => void;
  onMuted: (isMuted: boolean) => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && mediaStream) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [mediaStream]);

  return (
    <div className="relative rounded-xl h-full w-full overflow-hidden border border-zinc-900">
      <video
        className="absolute left-0 top-0 aspect-video h-full w-full object-cover"
        ref={videoRef}
        autoPlay
        playsInline
      />

      <div className="w-full flex items-end justify-between h-full gap-4 absolute">
        <div className="truncate mb-4 ml-4 flex gap-4 bg-voom_base_third/80 rounded-xl h-12 px-4 items-center justify-center text-sm">
          <h5 className="flex-1 truncate">{mediaStream?.id}</h5>
          <div className="rounded-full w-2 h-2 bg-green-500" />
        </div>
        <div className="mr-4 mb-4 flex gap-4">
          <CameraButton isVisible={isVisible} onChange={onVisible} />
          <MuteButton isMuted={isMuted} onChange={onMuted} />
        </div>
      </div>
    </div>
  );
};

export default VideoRatioScreen;
