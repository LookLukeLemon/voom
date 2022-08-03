import Room from 'components/room/Room';
import { Provider } from 'jotai';
import { useRouter } from 'next/router';
import React from 'react';

const RoomPage = () => {
  const router = useRouter();
  const { roomName } = router.query;

  if (!roomName || Array.isArray(roomName)) return null;

  return (
    <Provider>
      <Room roomName={roomName} />
    </Provider>
  );
};

export default RoomPage;
