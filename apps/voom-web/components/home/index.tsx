import React from 'react';
import HomeFunction from './home-function/HomeFunction';

const Home = () => {
  return (
    <div className="grid grid-cols-2 divide-x divide-voom_base_third h-full">
      <div className="p-12">
        <HomeFunction />
      </div>
      <div>...</div>
    </div>
  );
};

export default Home;
