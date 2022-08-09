import { PeerState, PublicRoomType } from 'common/types';
import { atom } from 'jotai';

export const roomsAtom = atom<PublicRoomType[]>([]);
export const myStreamAtom = atom<MediaStream | null>(null);
export const myPeerConnectionsAtom = atom<Map<string, RTCPeerConnection>>(
  new Map(),
);
export const myPeerStreamsAtom = atom<Map<string, PeerState>>(new Map());
export const myDataChannelsAtom = atom<Map<string, RTCDataChannel>>(new Map());
export const isMyCameraVisibleAtom = atom<boolean>(true);
export const isMyCameraMutedAtom = atom<boolean>(false);
export const isRecordingAtom = atom<boolean>(false);
