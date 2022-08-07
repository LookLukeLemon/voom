import { atom } from 'jotai';
import { io } from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_API_URL || '', {
  transports: ['websocket'],
});

export const socketAtom = atom<any>(socket);
