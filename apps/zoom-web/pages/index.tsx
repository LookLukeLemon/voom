import type { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
const socket = io('http://localhost:3000', { transports: ['websocket'] });

const Home: NextPage = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [myStream, setMyStream] = useState<MediaStream | undefined>();
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isShow, setIsShow] = useState<boolean>(true);

  const handleMute = () => {
    if (!myStream) return;

    myStream.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
      setIsMuted(track.enabled);
    });
  };

  const handleShow = () => {
    if (!myStream) return;

    myStream.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
      setIsShow(track.enabled);
    });
  };

  const fetchMedia = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      setMyStream(mediaStream);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter((d) => d.kind === 'videoinput');
      setVideoDevices(cameras);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDevices();
    fetchMedia();

    socket.on('connect', () => {
      console.log('커넥티드?');
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('pong', () => {
      setLastPong(new Date().toISOString());
    });

    socket.on('events', (data: any) => {
      console.log('received data from server', data);
    });

    socket.on('identity', (data: any) => {
      console.log('received data from server', data);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
      socket.off('events');
      socket.off('identity');
    };
  }, []);

  const handleRandomMsg = () => {
    socket.emit('events', 'random event');
  };

  const handleRandomIdentity = () => {
    socket.emit('identity', 'random identity');
  };

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline></video>
      <div>
        <select>
          {videoDevices?.map((v) => (
            <option key={v.deviceId}>{v.label}</option>
          ))}
        </select>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <button onClick={handleRandomMsg}>Submit to server</button>
        <button onClick={handleRandomIdentity}>
          Submit identity to server
        </button>
        <button
          className="bg-purple-800 px-4 py-2 rounded-lg text-white"
          onClick={handleMute}
        >
          {isMuted ? 'Unmute' : 'Mute'}
        </button>
        <button
          className="bg-purple-800 px-4 py-2 rounded-lg text-white"
          onClick={handleShow}
        >
          {isShow ? 'Hide' : 'Show'}
        </button>
      </div>
    </div>
  );
};

export default Home;
