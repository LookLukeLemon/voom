import { nanoid } from 'nanoid';
import {
  CHAT_MSG_TYPE,
  EVENT_ENTER,
  EVENT_LEAVE,
  MSG_JOIN_SOMEBODY,
  MSG_LEFT_SOMEBODY,
} from '../common/Constants';
import useSocket from './useSocket';
import { useAtomValue, useSetAtom } from 'jotai';
import { messagesAtom } from 'common/store/room/chat';
import { myDataChannelAtom, myStreamAtom } from 'common/store/room';

const useChat = () => {
  const myStream = useAtomValue(myStreamAtom);
  const myDataChannel = useAtomValue(myDataChannelAtom);
  const messages = useAtomValue(messagesAtom);
  const setMessages = useSetAtom(messagesAtom);

  const handleEntered = ({ nickname }: { nickname: string }) => {
    if (!myStream) return;
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: nanoid(),
        type: CHAT_MSG_TYPE.ENTER,
        from: nickname,
        nickname,
        payload: `${nickname} ${MSG_JOIN_SOMEBODY}`,
      },
    ]);
  };

  const handleLeaved = ({ nickname }: { nickname: string }) => {
    if (!myStream) return;
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: nanoid(),
        type: CHAT_MSG_TYPE.LEAVE,
        from: nickname,
        nickname,
        payload: `${nickname} ${MSG_LEFT_SOMEBODY}`,
      },
    ]);
  };

  const { socket } = useSocket([
    { event: EVENT_ENTER, data: handleEntered },
    { event: EVENT_LEAVE, data: handleLeaved },
  ]);

  const handleSendMessage = (message: string) => {
    if (!myDataChannel || !myStream) return;

    const payload = {
      type: CHAT_MSG_TYPE.CONTENT,
      from: myStream.id,
      nickname: myStream.id,
      payload: message,
    };

    myDataChannel.send(JSON.stringify(payload));
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: nanoid(),
        type: CHAT_MSG_TYPE.CONTENT,
        from: myStream.id,
        nickname: myStream.id,
        payload: message,
      },
    ]);
  };

  return {
    messages,
    onSendMessage: handleSendMessage,
  };
};

export default useChat;
