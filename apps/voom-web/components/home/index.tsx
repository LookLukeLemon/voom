import React from 'react';
import HomeFunction from './home-function/HomeFunction';
import Upcoming from './upcoming/Upcoming';

const Home = () => {
  return (
    <div className="lg:flex divide-x grid divide-voom_base_third h-full">
      <div className="p-4 sm:p-8 md:p-12 w-full lg:w-[576px]">
        <HomeFunction />
      </div>
      <div className="p-4 sm:p-8 md:p-12 lg:flex-1">
        <Upcoming />
      </div>
    </div>
  );
};

export default Home;
