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
    </div>
  );
};

export default VideoRatioScreen;
