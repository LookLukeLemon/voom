import { atom } from 'jotai';

export const isMyCameraVisibleAtom = atom<boolean>(true);
export const isMyCameraMutedAtom = atom<boolean>(false);
export const isRecordingAtom = atom<boolean>(false);
