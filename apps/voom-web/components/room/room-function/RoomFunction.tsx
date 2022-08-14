import useRoom from 'hooks/useRoom';
import Mute from './mute/Mute';
import Recording from './recording/Recording';
import VideoOnOff from './video-on-off/VideoOnOff';

const RoomFunction = ({ roomName }: { roomName: string }) => {
  const { onLeaveRoom } = useRoom({});

  return (
    <div className="h-24 flex items-center p-4 sm:p-6 gap-4 sm:gap-6">
      <Mute />
      <div className="hidden sm:block">
        <VideoOnOff />
      </div>
      <div className="flex-1 flex justify-center items-center text-sm h-full">
        <button
          className="bg-red-500 rounded-xl px-4 sm:px-6 h-12"
          onClick={() => onLeaveRoom(roomName)}
        >
          End
        </button>
      </div>
      <div className="hidden sm:block">
        <Recording />
      </div>
      <VideoOnOff />
    </div>
  );
};

export default RoomFunction;
