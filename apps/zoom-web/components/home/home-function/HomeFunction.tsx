import React from 'react';
import FunctionItem from './FunctionItem';
import FunctionList from './FuntionList';
import NewRoom from '../new-room';
import useHomeFunction from './useHomeFunction';

const HomeFunction = () => {
  const { isOpen, functions, onIsOpen, onCreateRoom } = useHomeFunction();
  return (
    <>
      <NewRoom
        isOpen={isOpen}
        onIsOpen={onIsOpen}
        onCreateRoom={onCreateRoom}
      />
      <FunctionList>
        {functions.map((f) => (
          <FunctionItem key={f.title} {...f} />
        ))}
      </FunctionList>
    </>
  );
};

export default HomeFunction;
