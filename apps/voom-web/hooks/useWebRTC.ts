import {
  CHAT_CHANNEL,
  EVENT_ANSWER,
  EVENT_ICE,
  EVENT_OFFER,
} from 'common/Constants';
import {
  myDataChannelAtom,
  myPeerConnAtom,
  peerStreamsMapAtom,
} from 'common/store/room';
import { messagesAtom } from 'common/store/room/chat';
import {
  ChatMessage,
  IceCandidatePayload,
  OfferAnswerPayload,
} from 'common/types';
import { useAtomValue, useSetAtom } from 'jotai';
import { nanoid } from 'nanoid';
import { useEffect } from 'react';
import useSocket from './useSocket';

const useWebRTC = (mediaStream: MediaStream | null) => {
  const myPeerConn = useAtomValue(myPeerConnAtom);
  const myDataChannel = useAtomValue(myDataChannelAtom);
  const setMessages = useSetAtom(messagesAtom);
  const setMyPeerConn = useSetAtom(myPeerConnAtom);
  const setMyDataChannel = useSetAtom(myDataChannelAtom);
  const setPeerStreamsMap = useSetAtom(peerStreamsMapAtom);
  let roomNameForICE = '';

  const handleReceiveOffer = async (payload: OfferAnswerPayload) => {
    if (myPeerConn) {
      myPeerConn.addEventListener('datachannel', (event) => {
        setMyDataChannel(event.channel);
        event.channel.addEventListener('message', handleReceiveChannelMessage);
      });
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

  const handleReceiveChannelMessage = (event: MessageEvent) => {
    const payload: ChatMessage = JSON.parse(event.data);

    setMessages((prev) => [
      ...prev,
      {
        id: nanoid(),
        from: payload.from,
        nickname: payload.nickname,
        type: payload.type,
        payload: payload.payload,
      },
    ]);
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

  const makeDataChannel = (peerConn: RTCPeerConnection, label: string) => {
    if (!peerConn || !label) return;

    const dataChannel = peerConn.createDataChannel(label);
    setMyDataChannel(dataChannel);
    dataChannel.addEventListener('message', handleReceiveChannelMessage);
  };

  useEffect(() => {
    return () => {
      if (myPeerConn) {
        myPeerConn.removeEventListener('icecandidate', handleICE);
        myPeerConn.removeEventListener('track', handleTrack);
      }
      if (myDataChannel) {
        myDataChannel.removeEventListener(
          'message',
          handleReceiveChannelMessage,
        );
      }
    };
  });

  return {
    makePeerConnection,
    makeDataChannel,
    sendOffer,
    sendAnswer,
  };
};

export default useWebRTC;
