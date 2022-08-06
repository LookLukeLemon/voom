import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  EVENT_ENTER,
  EVENT_FETCH_ROOMS,
  EVENT_JOIN_ROOM,
  EVENT_LEAVE_ROOM,
  MSG_JOIN_SOMEBODY,
  MSG_JOIN_SUCCESS,
} from '../common/Constants';
import useSocket from './useSocket';

const useRoom = () => {
  const router = useRouter();
  const [rooms, setRooms] = useState([]);

  const handleReceiveJoinRoom = (data: any) => {
    router.push(`/room/${data.room_name}`);
    console.log(MSG_JOIN_SUCCESS, data);
  };

  const handleReceiveLeaveRoom = (data: any) => {
    router.push(`/`);
  };

  const handleReceiveEntered = () => {
    console.log(MSG_JOIN_SOMEBODY);
  };

  const handleReceiveRooms = (data: any) => {
    setRooms(data);
  };

  const { socket } = useSocket([
    { event: EVENT_FETCH_ROOMS, data: handleReceiveRooms },
    { event: EVENT_JOIN_ROOM, data: handleReceiveJoinRoom },
    { event: EVENT_LEAVE_ROOM, data: handleReceiveLeaveRoom },
    { event: EVENT_ENTER, data: handleReceiveEntered },
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
    rooms,
    onJoinRoom: handleJoinRoom,
    onLeaveRoom: handleLeaveRoom,
    onFetchRooms: handleFetchRooms,
  };
};

export default useRoom;
