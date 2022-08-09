import { EVENT_ANSWER, EVENT_ICE, EVENT_OFFER } from 'common/Constants';
import {
  myDataChannelsAtom,
  myPeerConnectionsAtom,
  myPeerStreamsAtom,
} from 'common/store/room';
import { messagesAtom } from 'common/store/room/chat';
import {
  ChatMessage,
  IceCandidatePayload,
  OfferAnswerPayload,
  PeerState,
} from 'common/types';
import { useAtomValue, useSetAtom } from 'jotai';
import { nanoid } from 'nanoid';

import useSocket from './useSocket';

const useWebRTC = (mediaStream: MediaStream | null) => {
  const myPeerConnections = useAtomValue(myPeerConnectionsAtom);
  const myDataChannels = useAtomValue(myDataChannelsAtom);
  const setMessages = useSetAtom(messagesAtom);
  const setMyPeerConnections = useSetAtom(myPeerConnectionsAtom);
  const setMyDataChannels = useSetAtom(myDataChannelsAtom);
  const setMyPeerStreamsMap = useSetAtom(myPeerStreamsAtom);

  const handleReceiveOffer = async (payload: OfferAnswerPayload) => {
    const targetPeer = myPeerConnections.get(payload.socketId);

    if (targetPeer) {
      targetPeer.addEventListener('datachannel', (event) => {
        setMyDataChannels(
          new Map(myDataChannels.set(payload.socketId, event.channel)),
        );
        event.channel.addEventListener('message', handleReceiveChannelMessage);
      });
      await targetPeer.setRemoteDescription(payload.payload);
      const answer = await targetPeer.createAnswer();
      await targetPeer.setLocalDescription(answer);

      sendAnswer({
        roomName: payload.roomName,
        payload: answer,
        socketId: payload.socketId,
      });
    }
  };

  const handleReceiveAnswer = async (payload: OfferAnswerPayload) => {
    const targetPeer = myPeerConnections.get(payload.socketId);

    if (targetPeer) {
      await targetPeer.setRemoteDescription(payload.payload);
    }
  };

  const handleReceiveICE = async (payload: IceCandidatePayload) => {
    const targetPeer = myPeerConnections.get(payload.socketId);

    if (targetPeer && payload.payload) {
      await targetPeer.addIceCandidate(payload.payload);
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

  const handleICE = (
    event: RTCPeerConnectionIceEvent,
    peerSocketId: string,
  ) => {
    if (event.candidate) {
      socket.emit(EVENT_ICE, {
        payload: event.candidate,
        socketId: peerSocketId,
      });
    }
  };

  const handleTrack = (event: RTCTrackEvent, peerSocketId: string) => {
    let peerState: PeerState;

    // at this point, we assume there is only one stream in there
    event.streams.forEach((stream) => {
      peerState = {
        stream,
        isVisible: true,
        isMuted: false,
      };
    });

    setMyPeerStreamsMap(
      (streamsMap) => new Map(streamsMap.set(peerSocketId, peerState)),
    );
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

  const makePeerConnection = (peerSocketId: string) => {
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
      newPeerConn.addEventListener('icecandidate', (e) =>
        handleICE(e, peerSocketId),
      );
      newPeerConn.addEventListener('track', (e) =>
        handleTrack(e, peerSocketId),
      );
      mediaStream.getTracks().map((track) => {
        newPeerConn.addTrack(track, mediaStream);
      });

      myPeerConnections.set(peerSocketId, newPeerConn);
      setMyPeerConnections(new Map(myPeerConnections));

      return newPeerConn;
    } catch (err) {
      console.error(err);
    }
  };

  const makeDataChannel = (
    peerSocketId: string,
    peerConn: RTCPeerConnection,
    label: string,
  ) => {
    if (!peerConn || !label) return;

    const dataChannel = peerConn.createDataChannel(label);
    setMyDataChannels(new Map(myDataChannels.set(peerSocketId, dataChannel)));
    dataChannel.addEventListener('message', handleReceiveChannelMessage);
  };

  return {
    socketId: socket.id,
    makePeerConnection,
    makeDataChannel,
    sendOffer,
    sendAnswer,
  };
};

export default useWebRTC;
