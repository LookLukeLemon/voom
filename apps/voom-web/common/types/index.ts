import { StaticImageData } from 'next/image';

export interface SocketEventInitProps<T = (p: any) => void> {
  event: string;
  data?: T;
}

export type HomeFunctionProps = {
  title: string;
  desc: string;
  image: string | StaticImageData;
  onClick: () => void;
};

export type SelectItemType = {
  value: string | boolean;
  image: JSX.Element;
};

export type FadeSelectType = {
  selectedItem: SelectItemType;
  items: SelectItemType[];
  onChange: (itemValue: string) => void;
};

export type CameraScreenType = {
  mediaStream: MediaStream | null;
  onChangeVisible: (isVisible: boolean) => void;
  onChangeMuted: (isMuted: boolean) => void;
};

export type OfferAnswerPayload = {
  payload: RTCSessionDescriptionInit;
  roomName: string;
};

export type IceCandidatePayload = {
  payload: RTCIceCandidate;
  roomName: string;
};

export type PeerState = {
  stream: MediaStream;
  isVisible: boolean;
  isMuted: boolean;
};
