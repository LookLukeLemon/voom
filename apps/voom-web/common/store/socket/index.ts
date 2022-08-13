import { atom } from 'jotai';
import { io, Socket } from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_API_URL || '', {
  transports: ['websocket'],
  withCredentials: true,
});

socket.on('connect_error', (err) => {
  console.log(`connect_error due to ${err.message}`);
});

export const socketAtom = atom<Socket>(socket);
