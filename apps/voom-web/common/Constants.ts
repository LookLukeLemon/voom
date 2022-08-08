export const EVENT_FETCH_ROOMS = 'rooms';
export const EVENT_JOIN_ROOM = 'join_room';
export const EVENT_LEAVE_ROOM = 'leave_room';
export const EVENT_ENTER = 'enter';
export const EVENT_LEAVE = 'leave';
export const EVENT_SEND = 'send';
export const EVENT_OFFER = 'offer';
export const EVENT_ANSWER = 'answer';
export const EVENT_ICE = 'ice';

export const ACTION_CREATE_ROOM = 'Create Room';

export const TITLE_CREATE_ROOM = 'Create New Room';
export const TITLE_HOME_FUNCTION_NEW_MEETING = 'New Meeting';
export const TITLE_HOME_FUNCTION_JOIN_MEETING = 'Join Meeting';
export const TITLE_HOME_FUNCTION_SCHEDULE = 'Schedule';
export const TITLE_HOME_FUNCTION_SHARE_SCREEN = 'Share Screen';
export const INFO_CREATE_ROOM = 'The clearer the topic of the room, the better';
export const INFO_HOME_FUNCTION_NEW_MEETING = 'set up new meeting';
export const INFO_HOME_FUNCTION_JOIN_MEETING = 'via invitation link or...';
export const INFO_HOME_FUNCTION_SCHEDULE = 'plan your meetings';
export const INFO_HOME_FUNCTION_SHARE_SCREEN = 'show your work';

export const MSG_JOIN_SUCCESS = 'You are successfully joined';
export const MSG_JOIN_SOMEBODY = 'has entered';
export const MSG_LEFT_SOMEBODY = 'has left';

export enum CHAT_MSG_TYPE {
  ENTER,
  LEAVE,
  CONTENT,
  NOTICE,
}
