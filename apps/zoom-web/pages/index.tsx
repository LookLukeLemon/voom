import type { NextPage } from 'next';
import { io } from 'socket.io-client';

const Home: NextPage = () => {
  const socket = io(`wss://localhost:8080`);

  // client-side
  socket.on('connect', () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  });

  socket.on('disconnect', () => {
    console.log(socket.id); // undefined
  });

  return <div>haha</div>;
};

export default Home;
