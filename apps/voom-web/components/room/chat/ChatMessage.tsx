import BaseImage from 'common/BaseImage';
import { CHAT_MSG_TYPE } from 'common/Constants';
import { myStreamAtom } from 'common/store/room';
import { useAtomValue } from 'jotai';
import AvatarImage from 'public/images/avatar.svg';
import AvatarTwoImage from 'public/images/avatar-1.svg';

const ChatMessage = ({
  from,
  msg,
  msgType,
}: {
  from: string;
  msg: string;
  msgType: CHAT_MSG_TYPE;
}) => {
  const myStream = useAtomValue(myStreamAtom);
  switch (msgType) {
    case CHAT_MSG_TYPE.ENTER:
    case CHAT_MSG_TYPE.LEAVE:
      return <div className="text-xs text-center text-zinc-500">{msg}</div>;
    case CHAT_MSG_TYPE.CONTENT: {
      if (!myStream) return null;

      const mine = myStream.id === from;

      return mine ? (
        <div className="text-xs text-zinc-500 flex gap-4 ">
          <div className="relative h-8 aspect-square rounded-xl overflow-hidden">
            <BaseImage src={AvatarImage} layout="fill" objectFit="cover" />
          </div>
          <div className="flex-1 ">
            <div className="w-fit border-voom_base_third border rounded-xl bg-voom_base_secondary px-4 py-2">
              {msg}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-xs text-zinc-500 flex gap-4 ">
          <div className="flex-1 flex justify-end">
            <div className="w-fit border-voom_base_third border rounded-xl bg-voom_base_secondary px-4 py-2">
              {msg}
            </div>
          </div>
          <div className="relative h-8 aspect-square rounded-xl overflow-hidden">
            <BaseImage src={AvatarTwoImage} layout="fill" objectFit="cover" />
          </div>
        </div>
      );
    }

    default:
      return null;
  }
};

export default ChatMessage;
