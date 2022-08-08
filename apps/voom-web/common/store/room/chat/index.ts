import { ChatMessage } from 'common/types';
import { atom } from 'jotai';

export const messagesAtom = atom<ChatMessage[]>([]);
