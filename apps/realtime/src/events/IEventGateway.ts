import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

interface IEventGateway
  extends OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect {
  joinRoom(
    room_name: string,
    socket?: Socket,
  ): { event: string; data: { room_name: string } };
  leaveRoom(
    room_name: string,
    socket?: Socket,
  ): { event: string; data: { room_name: string } };
}

export default IEventGateway;
