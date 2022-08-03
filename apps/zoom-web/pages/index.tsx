import type { NextPage } from 'next';
import Home from '../components/home';

const HomePage: NextPage = () => {
  // let peerConn: RTCPeerConnection;
  // const videoRef = useRef<HTMLVideoElement>(null);
  // const [myStream, setMyStream] = useState<MediaStream | undefined>();
  // const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  // const [isMuted, setIsMuted] = useState<boolean>(true);
  // const [isShow, setIsShow] = useState<boolean>(true);

  // const handleMute = () => {
  //   if (!myStream) return;

  //   myStream.getAudioTracks().forEach((track) => {
  //     track.enabled = !track.enabled;
  //     setIsMuted(track.enabled);
  //   });
  // };

  // const handleShow = () => {
  //   if (!myStream) return;

  //   myStream.getVideoTracks().forEach((track) => {
  //     track.enabled = !track.enabled;
  //     setIsShow(track.enabled);
  //   });
  // };

  // const makePeerConnection = (mediaStream: MediaStream | undefined) => {
  //   const myPeerConn = new RTCPeerConnection();
  //   mediaStream
  //     ?.getTracks()
  //     .forEach((track) => myPeerConn.addTrack(track, mediaStream));

  //   peerConn = myPeerConn;
  //   return myPeerConn;
  // };

  // const fetchMedia = async (): Promise<MediaStream | undefined> => {
  //   try {
  //     const mediaStream = await navigator.mediaDevices.getUserMedia({
  //       audio: true,
  //       video: true,
  //     });

  //     if (videoRef.current) {
  //       videoRef.current.srcObject = mediaStream;
  //     }

  //     setMyStream(mediaStream);
  //     return mediaStream;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const fetchDevices = async () => {
  //   try {
  //     const devices = await navigator.mediaDevices.enumerateDevices();
  //     const cameras = devices.filter((d) => d.kind === 'videoinput');
  //     setVideoDevices(cameras);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const getPrerequisite = async () => {
  //   await fetchDevices();
  //   const mediaStream = await fetchMedia();
  //   const myPeerConn = makePeerConnection(mediaStream);

  //   socket.emit('join_room', 'wanna join');
  // };

  return (
    <Home />
    // <div>
    //   <video ref={videoRef} autoPlay playsInline></video>
    //   <div className="grid gap-2">
    //     <select>
    //       {videoDevices?.map((v) => (
    //         <option key={v.deviceId}>{v.label}</option>
    //       ))}
    //     </select>
    //     <h1 className="text-3xl font-bold underline">Hello world!</h1>
    //     <button
    //       className="bg-purple-800 px-4 py-2 rounded-lg text-white"
    //       onClick={getPrerequisite}
    //     >
    //       join room
    //     </button>
    //     <button
    //       className="bg-purple-800 px-4 py-2 rounded-lg text-white"
    //       onClick={handleRandomMsg}
    //     >
    //       Submit to server
    //     </button>
    //     <button
    //       className="bg-purple-800 px-4 py-2 rounded-lg text-white"
    //       onClick={handleRandomIdentity}
    //     >
    //       Submit identity to server
    //     </button>
    //     <button
    //       className="bg-purple-800 px-4 py-2 rounded-lg text-white"
    //       onClick={handleMute}
    //     >
    //       {isMuted ? 'Unmute' : 'Mute'}
    //     </button>
    //     <button
    //       className="bg-purple-800 px-4 py-2 rounded-lg text-white"
    //       onClick={handleShow}
    //     >
    //       {isShow ? 'Hide' : 'Show'}
    //     </button>
    //   </div>
    // </div>
  );
};

export default HomePage;
