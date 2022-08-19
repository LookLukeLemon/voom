import React from 'react';
import BaseImage from '../common/BaseImage';
import VoomImage from 'public/images/voom.svg';
import HomeImage from 'public/images/home.svg';
import UserImage from 'public/images/user.svg';
import CommentImage from 'public/images/comment.svg';
import SettingImage from 'public/images/setting.svg';

const SideMenu = () => {
  return (
    <div className="w-16 sm:w-24 p-4 sm:p-6 flex flex-col gap-4 sm:gap-6">
      <div className="bg-voom_primary aspect-square flex items-center justify-center rounded-xl p-2">
        <div className="relative h-4 sm:h-5 aspect-square">
          <BaseImage src={VoomImage} layout="fill" objectFit="cover" alt="" />
        </div>
      </div>

      <div className="flex-1 mt-12 flex flex-col gap-2">
        <div className="bg-voom_base_third cursor-pointer aspect-square border  border-zinc-700 flex items-center justify-center rounded-xl p-2">
          <div className="relative h-4 sm:h-5 aspect-square">
            <BaseImage src={HomeImage} layout="fill" objectFit="cover" alt="" />
          </div>
        </div>

        <div className="cursor-pointer aspect-square flex items-center justify-center rounded-xl p-2">
          <div className="relative h-4 sm:h-5 aspect-square">
            <BaseImage src={UserImage} layout="fill" objectFit="cover" alt="" />
          </div>
        </div>

        <div className="cursor-pointer aspect-square flex items-center justify-center rounded-xl p-2">
          <div className="relative h-4 sm:h-5 aspect-square">
            <BaseImage
              src={CommentImage}
              layout="fill"
              objectFit="cover"
              alt=""
            />
          </div>
        </div>
        <div className="cursor-pointer aspect-square flex items-center justify-center rounded-xl p-2">
          <div className="relative h-4 sm:h-5 aspect-square">
            <BaseImage
              src={SettingImage}
              layout="fill"
              objectFit="cover"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
