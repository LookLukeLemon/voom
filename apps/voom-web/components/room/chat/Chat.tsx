import CommentImage from 'public/images/comment.svg';
import BaseImage from 'common/BaseImage';
import ChatMessage from './ChatMessage';
import ChatMessageList from './ChatMessageList';
import useChat from 'hooks/useChat';

const Chat = () => {
  const { messages } = useChat();

  return (
    <div className="flex-1">
      <div className="bg-voom_base_third px-6 py-3 text-sm border-y border-zinc-700 flex gap-4">
        <div className="relative w-5 aspect-square">
          <BaseImage src={CommentImage} layout="fill" objectFit="cover" />
        </div>
        Chat
      </div>

      <div className="p-6">
        <ChatMessageList>
          {messages.map((m: any) => {
            return (
              <ChatMessage
                key={m.nickname}
                from=""
                to=""
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
