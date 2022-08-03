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

@WebSocketGateway({
  transports: ['websocket'],
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('VoomGateway');
  @WebSocketServer()
  server: Server;

  afterInit(server: any) {
    this.logger.debug(`init`);
  }
  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.debug(`disconnected : ${socket.id}`);
  }
  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.debug(`connected : ${socket.id}`);
  }

  @SubscribeMessage('join_room')
  joinRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() room_name: string,
  ) {
    socket.join(room_name);
    this.logger.debug(`join_room : ${room_name}`);
    socket.to(room_name).emit('welcome');
    return { event: 'join_room', data: `you joined ${room_name}` };
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
