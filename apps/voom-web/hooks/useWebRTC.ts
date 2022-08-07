import { myPeerConnAtom, myStreamAtom } from 'common/store/room';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';

const useWebRTC = () => {
  const myStream = useAtomValue(myStreamAtom);
  const myPeerConn = useAtomValue(myPeerConnAtom);
  const setMyPeerConn = useSetAtom(myPeerConnAtom);

  useEffect(() => {
    if (!myStream) return;

    try {
      const newPeerConn = new RTCPeerConnection();
      myStream.getTracks().map((track) => {
        newPeerConn.addTrack(track, myStream);
      });

      setMyPeerConn(newPeerConn);
    } catch (err) {
      console.error(err);
    }

    return () => {
      if (myPeerConn) {
        myPeerConn.close();
      }
    };
  }, [myStream]);

  return {
    myPeerConn,
  };
};

export default useWebRTC;
