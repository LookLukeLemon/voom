import { isMyCameraMutedAtom, isMyCameraVisibleAtom } from 'common/store/room';
import { useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';

const useMyCamera = () => {
  const [myStream, setMyStream] = useState<MediaStream>();
  const setIsMyCameraVisible = useSetAtom(isMyCameraVisibleAtom);
  const setIsMyCameraMuted = useSetAtom(isMyCameraMutedAtom);

  const fetchMedia = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      setMyStream(mediaStream);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangeMyCameraVisible = (visible: boolean) => {
    if (!myStream) return;

    myStream.getVideoTracks().forEach((track) => (track.enabled = visible));
    setIsMyCameraVisible(visible);
  };

  const handleChangeMyCameraMuted = (muted: boolean) => {
    if (!myStream) return;

    myStream.getAudioTracks().forEach((track) => (track.enabled = muted));
    setIsMyCameraMuted(muted);
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  return {
    myStream,
    onChangeMyCameraMuted: handleChangeMyCameraMuted,
    onChangeMyCameraVisible: handleChangeMyCameraVisible,
  };
};

export default useMyCamera;
