import React, { useState } from 'react';

const RoomFunction = () => {
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isShow, setIsShow] = useState<boolean>(true);

  return <div className="h-24">Room functions</div>;
};

export default RoomFunction;
