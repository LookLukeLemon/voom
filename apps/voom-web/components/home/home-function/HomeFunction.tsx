import React from 'react';
import FunctionItem from './FunctionItem';
import FunctionList from './FuntionList';
import useHomeFunction from './useHomeFunction';

const HomeFunction = () => {
  const { functions } = useHomeFunction();
  return (
    <>
      <FunctionList>
        {functions.map((f) => (
          <FunctionItem key={f.title} {...f} />
        ))}
      </FunctionList>
    </>
  );
};

export default HomeFunction;
