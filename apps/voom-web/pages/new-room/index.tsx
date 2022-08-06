import NewRoom from 'components/new-room';
import React from 'react';

const NewRoomPage = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="border border-voom_base_third rounded-xl">
        <NewRoom />
      </div>
    </div>
  );
};

export default NewRoomPage;
