import Room from 'components/room/Room';
import { useRouter } from 'next/router';
import React from 'react';

const RoomPage = () => {
  const router = useRouter();
  const { roomName } = router.query;

  // if (!roomName || Array.isArray(roomName)) return null;

  return <Room />;
};

export default RoomPage;
