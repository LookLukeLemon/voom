import { CHAT_MSG_TYPE } from 'common/Constants';
import React from 'react';

const ChatMessage = ({
  from,
  to,
  msg,
  msgType,
}: {
  from: string;
  to: string;
  msg: string;
  msgType: CHAT_MSG_TYPE;
}) => {
  switch (msgType) {
    case CHAT_MSG_TYPE.ENTER:
    case CHAT_MSG_TYPE.LEAVE:
      return <div className="text-xs text-center text-zinc-500">{msg}</div>;
    default:
      return null;
  }
};

export default ChatMessage;
