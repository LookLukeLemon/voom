import React from 'react';
import {
  DocumentAddIcon,
  MicrophoneIcon,
  UploadIcon,
} from '@heroicons/react/outline';

const ChatAction = () => {
  return (
    <div className="h-24 p-6 py-5 text-sm">
      <div className="flex h-full flex-col">
        <div className="flex-1 flex gap-2 text-zinc-500">
          <DocumentAddIcon className="w-4 aspect-square" />
          <UploadIcon className="w-4 aspect-square" />
          <MicrophoneIcon className="w-4 aspect-square" />
        </div>
        <div className="flex-1 flex">
          <input
            className=" bg-voom_base_primary outline-none border-none placehoder-voom_base_third flex-1"
            placeholder="Type to write a message"
          />
          <button className="bg-voom_primary px-4 py-1.5 rounded-xl">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatAction;
