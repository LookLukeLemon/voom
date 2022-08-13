import { atom } from 'jotai';
import { io, Socket } from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_API_URL || '', {
  transports: ['websocket'],
  withCredentials: true,
  rejectUnauthorized: false,
});

socket.on('connect_error', (err) => {
  console.log(`connect_error due to ${err}`);
});

export const socketAtom = atom<Socket>(socket);
