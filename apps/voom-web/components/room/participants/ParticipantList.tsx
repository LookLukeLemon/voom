import React, { ReactNode } from 'react';

const ParticipantList = ({ children }: { children: ReactNode }) => {
  return <ul className="grid w-full overflow-auto">{children}</ul>;
};

export default ParticipantList;
