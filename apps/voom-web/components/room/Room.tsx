import Chat from './chat/Chat';
import ChatAction from './chat-action/ChatAction';
import MultiScreen from './multi-screen/MultiScreen';
import Participants from './participants/Participants';
import RoomFunction from './room-function/RoomFunction';

const Room = ({ roomName }: { roomName: string }) => {
  return (
    <div className="flex text-white h-full divide-x divide-voom_base_third">
      <div className="flex-1 flex flex-col divide-y divide-voom_base_third">
        <div className="flex-1">
          <MultiScreen roomName={roomName} />
        </div>

        <RoomFunction roomName={roomName} />
      </div>
      <div className="hidden w-96 md:flex flex-col divide-y divide-voom_base_third">
        <div className="flex-1 overflow-auto flex flex-col">
          <Participants />
          <Chat />
        </div>
        <ChatAction />
      </div>
    </div>
  );
};

export default Room;
