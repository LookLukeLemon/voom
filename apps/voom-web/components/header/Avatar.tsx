import React from 'react';
import AvatarImage from 'public/images/avatar.svg';
import BaseImage from 'components/common/BaseImage';

const Avatar = () => {
  return (
    <div className="py-6 self-center">
      <div className="relative h-12 aspect-square rounded-xl overflow-hidden">
        <BaseImage src={AvatarImage} layout="fill" objectFit="cover" />
      </div>
    </div>
  );
};

export default Avatar;
