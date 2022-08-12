import { atom } from 'jotai';
import { io, Socket } from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_API_URL || '', {
  transports: ['websocket'],
  withCredentials: true,
});

export const socketAtom = atom<Socket>(socket);
