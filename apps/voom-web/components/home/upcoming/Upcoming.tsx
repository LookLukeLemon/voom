import {
  DotsHorizontalIcon,
  InformationCircleIcon,
} from '@heroicons/react/outline';
import BaseImage from 'common/BaseImage';
import AvatarImage from 'public/images/avatar.svg';
import AvatarTwoImage from 'public/images/avatar-2.svg';
import AvatarThreeImage from 'public/images/avatar-3.svg';
import AvatarFourImage from 'public/images/avatar-4.svg';
import AvatarFiveImage from 'public/images/avatar-5.svg';
import BackImage from 'public/images/back.jpg';

const Upcoming = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="relative bg-gray-600 rounded-xl overflow-hidden h-56 w-full text-white">
        <BaseImage src={BackImage} layout="fill" objectFit="cover" />

        <div className="flex absolute top-0 left-0 flex-col justify-end h-full p-8 gap-4 z-10">
          <h2 className="text-6xl">12:59</h2>
          <p>Tursday, 29 October 2021</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-voom_base_secondary border-voom_base_third border rounded-xl h-56 w-full flex flex-col text-white p-8 space-y-1">
          <div className="flex">
            <h2 className="flex-1 text-lg font-semibold truncate">
              Design Daily Meeting
            </h2>
            <button className="bg-voom_base_third px-3 py-1.5 border-zinc-500/20 border rounded-xl">
              <DotsHorizontalIcon className="h-5 aspect-square text-zinc-500" />
            </button>
          </div>
          <div className="flex items-center gap-1 text-zinc-500 text-xs truncate">
            <InformationCircleIcon className="h-3.5" />
            <p className="truncate">{`10:00 ~ 11:30 | starts in 2 hours`}</p>
          </div>

          <div className="flex-1 h-full flex items-end">
            <div className="flex gap-2 flex-1">
              <div className="relative h-12 aspect-square rounded-xl overflow-hidden">
                <BaseImage src={AvatarImage} layout="fill" objectFit="cover" />
              </div>
              <div className="relative h-12 aspect-square rounded-xl overflow-hidden">
                <BaseImage
                  src={AvatarTwoImage}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>

            <button className="bg-voom_primary h-12 px-6 rounded-xl">
              Start
            </button>
          </div>
        </div>
        <div className="bg-voom_base_secondary border-voom_base_third border rounded-xl h-56 w-full flex flex-col text-white p-8 space-y-1">
          <div className="flex">
            <h2 className="flex-1 text-lg font-semibold truncate">
              Marketing Daily Meeting
            </h2>
            <button className="bg-voom_base_third px-3 py-1.5 border-zinc-500/20 border rounded-xl">
              <DotsHorizontalIcon className="h-5 aspect-square text-zinc-500" />
            </button>
          </div>
          <div className="flex items-center gap-1 text-zinc-500 text-xs truncate">
            <InformationCircleIcon className="h-3.5" />
            <p className="truncate">{`10:00 ~ 11:30 | starts in 18 hours`}</p>
          </div>

          <div className="flex-1 h-full flex items-end">
            <div className="flex gap-2 flex-1">
              <div className="relative h-12 aspect-square rounded-xl overflow-hidden">
                <BaseImage src={AvatarImage} layout="fill" objectFit="cover" />
              </div>

              <div className="relative h-12 aspect-square rounded-xl overflow-hidden">
                <BaseImage
                  src={AvatarThreeImage}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>

            <button className="bg-voom_primary h-12 px-6 rounded-xl">
              Start
            </button>
          </div>
        </div>
        <div className="bg-voom_base_secondary border-voom_base_third border rounded-xl h-56 w-full flex flex-col text-white p-8 space-y-1">
          <div className="flex">
            <h2 className="flex-1 text-lg font-semibold truncate">
              Management Meeting
            </h2>
            <button className="bg-voom_base_third px-3 py-1.5 border-zinc-500/20 border rounded-xl">
              <DotsHorizontalIcon className="h-5 aspect-square text-zinc-500" />
            </button>
          </div>
          <div className="flex items-center gap-1 text-zinc-500 text-xs truncate">
            <InformationCircleIcon className="h-3.5" />
            <p className="truncate">{`12:00 ~ 14:00 | starts in 3:30 hours`}</p>
          </div>

          <div className="flex-1 h-full flex items-end">
            <div className="flex gap-2 flex-1">
              <div className="relative h-12 aspect-square rounded-xl overflow-hidden">
                <BaseImage
                  src={AvatarFiveImage}
                  layout="fill"
                  objectFit="cover"
                />
              </div>

              <div className="relative h-12 aspect-square rounded-xl overflow-hidden">
                <BaseImage
                  src={AvatarFourImage}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="relative h-12 aspect-square bg-voom_primary flex justify-center items-center rounded-xl overflow-hidden">
                +6
              </div>
            </div>

            <button className="bg-voom_primary h-12 px-6 rounded-xl">
              Start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upcoming;
