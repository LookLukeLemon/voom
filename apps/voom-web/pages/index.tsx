import type { NextPage } from 'next';
import Home from '../components/home';

const HomePage: NextPage = () => {
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
