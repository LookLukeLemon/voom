import { EVENT_ANSWER, EVENT_ICE, EVENT_OFFER } from 'common/Constants';
import { myPeerConnAtom, peerStreamsMapAtom } from 'common/store/room';
import { IceCandidatePayload, OfferAnswerPayload } from 'common/types';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import useSocket from './useSocket';

const useWebRTC = (mediaStream: MediaStream | null) => {
  const myPeerConn = useAtomValue(myPeerConnAtom);
  const setMyPeerConn = useSetAtom(myPeerConnAtom);
  const setPeerStreamsMap = useSetAtom(peerStreamsMapAtom);
  let roomNameForICE = '';

  const handleReceiveOffer = async (payload: OfferAnswerPayload) => {
    if (myPeerConn) {
      await myPeerConn.setRemoteDescription(payload.payload);
      const answer = await myPeerConn.createAnswer();
      await myPeerConn.setLocalDescription(answer);
      sendAnswer({ roomName: payload.roomName, payload: answer });
    }
  };

  const handleReceiveAnswer = async (payload: OfferAnswerPayload) => {
    await myPeerConn?.setRemoteDescription(payload.payload);
  };

  const handleReceiveICE = async (payload: IceCandidatePayload) => {
    if (payload.payload) {
      await myPeerConn?.addIceCandidate(payload.payload);
    }
  };

  const { socket } = useSocket([
    { event: EVENT_OFFER, data: handleReceiveOffer },
    { event: EVENT_ANSWER, data: handleReceiveAnswer },
    { event: EVENT_ICE, data: handleReceiveICE },
  ]);

  const sendOffer = (payload: OfferAnswerPayload) => {
    socket.emit(EVENT_OFFER, payload);
  };

  const sendAnswer = (payload: OfferAnswerPayload) => {
    socket.emit(EVENT_ANSWER, payload);
  };

  const handleICE = (data: RTCPeerConnectionIceEvent) => {
    if (data.candidate && roomNameForICE) {
      socket.emit(EVENT_ICE, {
        payload: data.candidate,
        roomName: roomNameForICE,
      });
    }
  };

  const handleTrack = (data: RTCTrackEvent) => {
    const peerStreamsMap = new Map();

    data.streams.forEach((stream) => {
      peerStreamsMap.set(stream.id, {
        stream,
        isVisible: true,
        isMuted: false,
      });
    });

    setPeerStreamsMap(peerStreamsMap);
  };

  const handleConnectionStateChange = (data: Event) => {
    const connectionState = data.currentTarget as RTCPeerConnection;
    if (connectionState.connectionState === 'disconnected') {
      myPeerConn?.close();
    }
  };

  const makePeerConnection = (roomName: string) => {
    if (!mediaStream || !process.env.NEXT_PUBLIC_STUN_GOOGLE_LIST) return;

    try {
      const STUN_LIST = process.env.NEXT_PUBLIC_STUN_GOOGLE_LIST.split(' ');
      const newPeerConn = new RTCPeerConnection({
        iceServers: [
          {
            urls: STUN_LIST,
          },
        ],
      });
      newPeerConn.addEventListener('icecandidate', handleICE);
      newPeerConn.addEventListener('track', handleTrack);
      newPeerConn.addEventListener(
        'connectionstatechange',
        handleConnectionStateChange,
      );
      mediaStream.getTracks().map((track) => {
        newPeerConn.addTrack(track, mediaStream);
      });

      roomNameForICE = roomName;
      setMyPeerConn(newPeerConn);
      return newPeerConn;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    return () => {
      if (myPeerConn) {
        myPeerConn.removeEventListener('icecandidate', handleICE);
        myPeerConn.removeEventListener('track', handleTrack);
      }
    };
  });

  return {
    makePeerConnection,
    sendOffer,
    sendAnswer,
  };
};

export default useWebRTC;
