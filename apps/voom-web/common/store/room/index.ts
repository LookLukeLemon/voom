import { PeerState } from 'common/types';
import { atom } from 'jotai';

export const roomsAtom = atom<string[]>([]);
export const myStreamAtom = atom<MediaStream | null>(null);
export const myPeerConnAtom = atom<RTCPeerConnection | null>(null);
export const myDataChannelAtom = atom<RTCDataChannel | null>(null);
export const isMyCameraVisibleAtom = atom<boolean>(true);
export const isMyCameraMutedAtom = atom<boolean>(false);
export const isRecordingAtom = atom<boolean>(false);
export const peerStreamsMapAtom = atom<Map<string, PeerState>>(new Map());
