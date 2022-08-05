import React from 'react';
import CommentImage from 'public/images/comment.svg';
import BaseImage from 'common/BaseImage';

const Chat = () => {
  return (
    <div className="flex-1">
      <div className="bg-voom_base_third px-6 py-3 text-sm border-y border-zinc-700 flex gap-4">
        <div className="relative w-5 aspect-square">
          <BaseImage src={CommentImage} layout="fill" objectFit="cover" />
        </div>
        Chat
      </div>
    </div>
  );
};

export default Chat;
