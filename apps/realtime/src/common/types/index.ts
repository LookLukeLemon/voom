export type OfferAnswerPayload = {
  payload: RTCSessionDescriptionInit;
  roomName: string;
  socketId: string;
};

export type IceCandidatePayload = {
  payload: RTCIceCandidate;
  socketId: string;
};
