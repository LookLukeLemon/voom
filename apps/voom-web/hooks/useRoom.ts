import { useRouter } from 'next/router';
import {
  EVENT_JOIN_ROOM,
  EVENT_WELCOME,
  MSG_JOIN_SOMEBODY,
  MSG_JOIN_SUCCESS,
} from '../common/Constants';
import useSocket from './useSocket';

const useRoom = () => {
  const router = useRouter();
  const handleJoinRoom = (data: any) => {
    router.push(`/room/${data.room_name}`);
    console.log(MSG_JOIN_SUCCESS, data);
  };

  const handleWelcome = () => {
    console.log(MSG_JOIN_SOMEBODY);
  };

  const { socket } = useSocket([
    { event: EVENT_JOIN_ROOM, data: handleJoinRoom },
    { event: EVENT_WELCOME, data: handleWelcome },
  ]);

  const handleCreateRoom = (roomName: string) => {
    if (!socket || !roomName) return;
    socket.emit(EVENT_JOIN_ROOM, roomName);
  };

  return {
    onCreateRoom: handleCreateRoom,
  };
};

export default useRoom;
