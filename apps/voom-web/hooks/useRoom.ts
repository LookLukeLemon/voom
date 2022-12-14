import {
  myDataChannelsAtom,
  myPeerConnectionsAtom,
  myPeerStreamsAtom,
  roomsAtom,
} from '@/common/store/room';
import { EnteredLeavedPayload, PublicRoomType } from '@/common/types';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/router';

import {
  EVENT_ENTER,
  EVENT_FETCH_ROOMS,
  EVENT_JOIN_ROOM,
  EVENT_LEAVE,
  EVENT_LEAVE_ROOM,
} from '@/common/Constants';
import useSocket from './useSocket';

const useRoom = ({
  onReceiveEntered,
}: {
  onReceiveEntered?: (payload: any) => void;
}) => {
  const router = useRouter();
  const setRooms = useSetAtom(roomsAtom);
  const setMyPeerConnections = useSetAtom(myPeerConnectionsAtom);
  const setMyDataChannels = useSetAtom(myDataChannelsAtom);
  const setMyPeerStreams = useSetAtom(myPeerStreamsAtom);

  const handleReceiveJoinRoom = (data: any) => {
    router.push(`/room/${data.room_name}`);
  };

  const handleReceiveLeaveRoom = (payload: EnteredLeavedPayload) => {
    router.push(`/`);
  };

  const handleReceiveLeave = (payload: EnteredLeavedPayload) => {
    setMyDataChannels((dataChannels) => {
      const targetDataChannel = dataChannels.get(payload.socketId);
      targetDataChannel?.close();
      dataChannels.delete(payload.socketId);
      return new Map(dataChannels);
    });

    setMyPeerStreams((peerStreams) => {
      peerStreams.delete(payload.socketId);
      return new Map(peerStreams);
    });

    setMyPeerConnections((peerConnections) => {
      const targetPeer = peerConnections.get(payload.socketId);
      targetPeer?.close();
      peerConnections.delete(payload.socketId);
      return new Map(peerConnections);
    });
  };

  const handleReceiveRooms = (data: PublicRoomType[]) => {
    setRooms((prev) => data);
  };

  const { socket } = useSocket([
    { event: EVENT_FETCH_ROOMS, data: handleReceiveRooms },
    { event: EVENT_JOIN_ROOM, data: handleReceiveJoinRoom },
    { event: EVENT_LEAVE_ROOM, data: handleReceiveLeaveRoom },
    { event: EVENT_LEAVE, data: handleReceiveLeave },
    { event: EVENT_ENTER, data: onReceiveEntered },
  ]);

  const handleJoinRoom = (roomName: string) => {
    if (!socket || !roomName) return;
    socket.emit(EVENT_JOIN_ROOM, roomName);
  };

  const handleLeaveRoom = (roomName: string) => {
    if (!socket || !roomName) return;
    socket.emit(EVENT_LEAVE_ROOM, roomName);
  };

  const handleFetchRooms = () => {
    if (!socket) return;
    socket.emit(EVENT_FETCH_ROOMS);
  };

  return {
    onJoinRoom: handleJoinRoom,
    onLeaveRoom: handleLeaveRoom,
    onFetchRooms: handleFetchRooms,
  };
};

export default useRoom;
