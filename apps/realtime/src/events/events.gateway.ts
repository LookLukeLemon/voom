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
  EVENT_JOIN_ROOM,
  EVENT_LEAVE_ROOM,
  EVENT_ROOMS,
} from '../common/Constants';

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
    this.logger.debug(`disconnected : ${socket.id}`);
    socket.off('disconnecting', () => this.handleDisconnecting(socket));
  }
  async handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.debug(`connected : ${socket.id}`);
    socket.on('disconnecting', () => this.handleDisconnecting(socket));
  }

  handleDisconnecting(socket: Socket) {
    this.logger.debug(`disconnecting : ${socket.id}`);
    socket.rooms.forEach((room) =>
      socket.to(room).emit('leave', { nickname: socket.id }),
    );
  }

  @SubscribeMessage(EVENT_ROOMS)
  async getPublicRooms(
    @ConnectedSocket() socket: Socket,
  ): Promise<WsResponse<any>> {
    const allSocks = await this.server.fetchSockets();
    const publicRooms = [
      ...new Set(
        allSocks.flatMap((sock) =>
          [...sock.rooms].filter((r) => r !== sock.id),
        ),
      ),
    ];
    return { event: 'rooms', data: publicRooms };
  }

  @SubscribeMessage(EVENT_JOIN_ROOM)
  joinRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() room_name: string,
  ) {
    socket.join(room_name);
    this.logger.debug(`join_room : ${room_name}`);

    socket.to(room_name).emit('enter', { nickname: socket.id });
    return { event: 'join_room', data: { room_name } };
  }

  @SubscribeMessage(EVENT_LEAVE_ROOM)
  leaveRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() room_name: string,
  ) {
    socket.leave(room_name);
    this.logger.debug(`leave_room : ${room_name}`);

    socket.to(room_name).emit('leave', { nickname: socket.id });
    return { event: 'leave_room', data: { room_name } };
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
