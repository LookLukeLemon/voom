import React, { ReactNode } from 'react';

const ChatMessageList = ({ children }: { children: ReactNode }) => {
  return <ul className="grid w-full overflow-auto gap-1">{children}</ul>;
};

export default ChatMessageList;
