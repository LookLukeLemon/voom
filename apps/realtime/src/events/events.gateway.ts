import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { randomUUID } from 'crypto';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';
import {
  EVENT_ANSWER,
  EVENT_CONNECTED,
  EVENT_DISCONNECTED,
  EVENT_DISCONNECTING,
  EVENT_ENTER,
  EVENT_ICE,
  EVENT_JOIN_ROOM,
  EVENT_LEAVE,
  EVENT_LEAVE_ROOM,
  EVENT_OFFER,
  EVENT_ROOMS,
} from '../common/Constants';
import { IceCandidatePayload, OfferAnswerPayload } from '../common/types';

@WebSocketGateway({
  transports: ['websocket'],
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('VoomGateway');
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    this.logger.debug(`init`);
  }
  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.debug(`${EVENT_DISCONNECTED} : ${socket.id}`);
    socket.off(EVENT_DISCONNECTING, () => this.handleDisconnecting(socket));
  }
  async handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.debug(`${EVENT_CONNECTED} : ${socket.id}`);
    socket.on(EVENT_DISCONNECTING, () => this.handleDisconnecting(socket));
  }

  handleDisconnecting(socket: Socket) {
    this.logger.debug(`${EVENT_DISCONNECTING} : ${socket.id}`);
    socket.rooms.forEach((room) =>
      socket
        .to(room)
        .emit(EVENT_LEAVE, { nickname: socket.id, socketId: socket.id }),
    );
  }

  @SubscribeMessage(EVENT_ROOMS)
  async getPublicRooms(
    @ConnectedSocket() socket: Socket,
  ): Promise<WsResponse<any>> {
    const socketIds = [...this.server.sockets.sockets.keys()];
    const allRooms = [...this.server.sockets.adapter.rooms];
    const publicRooms = allRooms
      .filter((room) => {
        const [key, value]: [key: string, value: Set<string>] = room;

        return !socketIds.some((id) => id === key);
      })
      .map((room) => {
        const [key, value]: [key: string, value: Set<string>] = room;

        return { key, value: [...value] };
      });

    return { event: EVENT_ROOMS, data: publicRooms };
  }

  @SubscribeMessage(EVENT_JOIN_ROOM)
  joinRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() room_name: string,
  ) {
    socket.join(room_name);
    this.logger.debug(`${EVENT_JOIN_ROOM} : ${room_name}`);

    socket
      .to(room_name)
      .emit(EVENT_ENTER, { nickname: socket.id, socketId: socket.id });
    return { event: `${EVENT_JOIN_ROOM}`, data: { room_name } };
  }

  @SubscribeMessage(EVENT_LEAVE_ROOM)
  leaveRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() room_name: string,
  ) {
    socket.leave(room_name);
    this.logger.debug(`${EVENT_LEAVE_ROOM} : ${room_name}`);

    socket
      .to(room_name)
      .emit(EVENT_LEAVE, { nickname: socket.id, socketId: socket.id });
    return { event: EVENT_LEAVE_ROOM, data: { room_name } };
  }

  @SubscribeMessage(EVENT_OFFER)
  offer(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: OfferAnswerPayload,
  ) {
    socket
      .to(payload.socketId)
      .emit(EVENT_OFFER, { ...payload, socketId: socket.id });
  }

  @SubscribeMessage(EVENT_ANSWER)
  answer(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: OfferAnswerPayload,
  ) {
    socket
      .to(payload.socketId)
      .emit(EVENT_ANSWER, { ...payload, socketId: socket.id });
  }

  @SubscribeMessage(EVENT_ICE)
  iceCandidate(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: IceCandidatePayload,
  ) {
    socket
      .to(payload.socketId)
      .emit(EVENT_ICE, { ...payload, socketId: socket.id });
  }

  @SubscribeMessage('events')
  events(@MessageBody() data: any): Observable<WsResponse<number>> {
    this.logger.debug(`events : ${data}`);
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: 'events', data: item })),
    );
  }

  @SubscribeMessage('identity')
  identity(@MessageBody() data: number): WsResponse<any> {
    this.logger.debug(`identity : ${data}`);
    return { event: 'identity', data: randomUUID() };
  }
}
