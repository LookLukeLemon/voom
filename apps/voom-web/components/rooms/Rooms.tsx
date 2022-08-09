import { roomsAtom } from 'common/store/room';
import useMyCamera from 'components/room/multi-screen/useMyCamera';
import useRoom from 'hooks/useRoom';
import useWebRTC from 'hooks/useWebRTC';
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import RoomItem from './RoomItem';

const Rooms = () => {
  const rooms = useAtomValue(roomsAtom);
  const { onFetchRooms, onJoinRoom } = useRoom({});
  const { myStream } = useMyCamera();
  const { makePeerConnection } = useWebRTC(myStream);

  useEffect(() => {
    onFetchRooms();
  }, []);

  if (!myStream) return null;

  return (
    <div className="grid grid-cols-3 gap-4">
      {rooms.map((r, idx) => (
        <RoomItem
          key={r.key}
          roomName={r.key}
          participants={r.value}
          idx={idx}
          onJoinRoom={() => {
            r.value.map((peerSocketId) => {
              makePeerConnection(peerSocketId);
            });

            onJoinRoom(r.key);
          }}
        />
      ))}
    </div>
  );
};

export default Rooms;
