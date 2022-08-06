import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { socketAtom } from '../common/store/socket';
import { SocketEventInitProps } from '../common/types';

const useSocket = (events: SocketEventInitProps[]) => {
  const socket = useAtomValue(socketAtom);

  useEffect(() => {
    events?.map((wsr) => {
      socket.on(wsr.event, wsr.data);
    });

    return () => {
      events?.map((wsr) => {
        socket.off(wsr.event);
      });
    };
  }, []);

  return { socket };
};

export default useSocket;