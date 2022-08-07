import { DotsHorizontalIcon } from '@heroicons/react/solid';
import BaseImage from 'common/BaseImage';
import { roomsAtom } from 'common/store/room';
import useRoom from 'hooks/useRoom';
import { useAtomValue } from 'jotai';
import AvatarImage from 'public/images/avatar.svg';
import { useEffect } from 'react';

const Rooms = () => {
  const rooms = useAtomValue(roomsAtom);
  const { onFetchRooms, onJoinRoom } = useRoom({});

  useEffect(() => {
    onFetchRooms();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {rooms.map((r, idx) => (
        <div
          key={r}
          className="bg-voom_base_secondary border-voom_base_third border rounded-xl h-56 w-full flex flex-col text-white p-8 space-y-1"
        >
          <div className="flex">
            <h2 className="flex-1 text-lg font-semibold truncate">{r}</h2>
            <button className="bg-voom_base_third px-3 py-1.5 border-zinc-500/20 border rounded-xl">
              <DotsHorizontalIcon className="h-5 aspect-square text-zinc-500" />
            </button>
          </div>
          <div className="flex items-center gap-1 text-zinc-500 text-xs truncate">
            <p className="truncate">{`# ${idx + 1}`}</p>
          </div>

          <div className="flex-1 h-full flex items-end">
            <div className="flex gap-2 flex-1">
              <div className="relative h-12 aspect-square rounded-xl overflow-hidden">
                <BaseImage src={AvatarImage} layout="fill" objectFit="cover" />
              </div>
              <div className="relative h-12 aspect-square rounded-xl overflow-hidden">
                <BaseImage src={AvatarImage} layout="fill" objectFit="cover" />
              </div>
              <div className="relative h-12 aspect-square rounded-xl overflow-hidden">
                <BaseImage src={AvatarImage} layout="fill" objectFit="cover" />
              </div>
              <div className="relative h-12 aspect-square bg-voom_primary flex justify-center items-center rounded-xl overflow-hidden">
                +6
              </div>
            </div>

            <button
              className="bg-voom_primary h-12 px-6 rounded-xl"
              onClick={() => onJoinRoom(r)}
            >
              Join
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Rooms;
