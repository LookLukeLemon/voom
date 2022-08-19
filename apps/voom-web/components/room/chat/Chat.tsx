import CommentImage from 'public/images/comment.svg';
import BaseImage from 'components/common/BaseImage';
import ChatMessage from './ChatMessage';
import ChatMessageList from './ChatMessageList';
import useChat from 'hooks/useChat';
import { useEffect, useRef } from 'react';

const Chat = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages } = useChat();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={scrollRef} className="flex-1 overflow-auto">
      <div className="bg-voom_base_third sticky top-0 px-6 py-3 text-sm border-y border-zinc-700 flex gap-4 z-10">
        <div className="relative w-5 aspect-square">
          <BaseImage src={CommentImage} layout="fill" objectFit="cover" />
        </div>
        Chat
      </div>

      <div className="p-6">
        <ChatMessageList>
          {messages.map((m) => {
            return (
              <ChatMessage
                key={m.id}
                from={m.from}
                msg={m.payload}
                msgType={m.type}
              />
            );
          })}
        </ChatMessageList>
      </div>
    </div>
  );
};

export default Chat;
