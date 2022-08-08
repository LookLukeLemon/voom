export type OfferAnswerPayload = {
  payload: RTCSessionDescriptionInit;
  roomName: string;
};

export type IceCandidatePayload = {
  payload: RTCIceCandidate;
  roomName: string;
};
