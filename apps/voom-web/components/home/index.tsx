import React from 'react';
import HomeFunction from './home-function/HomeFunction';
import Upcoming from './upcoming/Upcoming';

const Home = () => {
  return (
    <div className="flex divide-x divide-voom_base_third h-full">
      <div className="p-12 w-[576px]">
        <HomeFunction />
      </div>
      <div className="p-12 flex-1">
        <Upcoming />
      </div>
    </div>
  );
};

export default Home;
