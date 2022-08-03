import { ReactNode } from 'react';

const FunctionList = ({ children }: { children: ReactNode }) => {
  return <ul className="grid grid-cols-2 w-full h-fit gap-6">{children}</ul>;
};

export default FunctionList;
