import { nanoid } from 'nanoid';
import {
  CHAT_MSG_TYPE,
  EVENT_ENTER,
  EVENT_LEAVE,
  EVENT_SEND,
  MSG_JOIN_SOMEBODY,
  MSG_LEFT_SOMEBODY,
} from '../common/Constants';
import useSocket from './useSocket';
import { useAtomValue, useSetAtom } from 'jotai';
import { messagesAtom } from 'common/store/room/chat';

const useChat = () => {
  const messages = useAtomValue(messagesAtom);
  const setMessages = useSetAtom(messagesAtom);

  const handleEntered = ({ nickname }: { nickname: string }) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: nanoid(),
        type: CHAT_MSG_TYPE.ENTER,
        nickname,
        payload: `${nickname} ${MSG_JOIN_SOMEBODY}`,
      },
    ]);
  };

  const handleLeaved = ({ nickname }: { nickname: string }) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: nanoid(),
        type: CHAT_MSG_TYPE.LEAVE,
        nickname,
        payload: `${nickname} ${MSG_LEFT_SOMEBODY}`,
      },
    ]);
  };

  const { socket } = useSocket([
    { event: EVENT_ENTER, data: handleEntered },
    { event: EVENT_LEAVE, data: handleLeaved },
  ]);

  const handleSendMessage = (roomName: string) => {
    if (!socket || !roomName) return;
    socket.emit(EVENT_SEND, { roomName, payload: 'msg' });
  };

  return {
    messages,
    onSendMessage: handleSendMessage,
  };
};

export default useChat;
