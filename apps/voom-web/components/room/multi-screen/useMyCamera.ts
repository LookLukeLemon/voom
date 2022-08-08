import {
  isMyCameraMutedAtom,
  isMyCameraVisibleAtom,
  myStreamAtom,
} from 'common/store/room';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';

const useMyCamera = () => {
  const myStream = useAtomValue(myStreamAtom);
  const setMyStream = useSetAtom(myStreamAtom);
  const setIsMyCameraVisible = useSetAtom(isMyCameraVisibleAtom);
  const setIsMyCameraMuted = useSetAtom(isMyCameraMutedAtom);

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

  const fetchMedia = async () => {
    if (myStream) return;
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
