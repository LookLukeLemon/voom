import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { EVENT_JOIN_ROOM, EVENT_LEAVE_ROOM } from '../common/Constants';
import IEventGateway from './IEventGateway';

export class MockEventsGateway implements IEventGateway {
  joinRoom(
    room_name: string,
    socket?: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  ): { event: string; data: { room_name: string } } {
    if (!room_name) throw new Error('should provide room_name.');

    return { event: `${EVENT_JOIN_ROOM}`, data: { room_name } };
  }

  leaveRoom(
    room_name: string,
    socket?: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  ): { event: string; data: { room_name: string } } {
    if (!room_name) throw new Error('should provide room_name.');

    return { event: `${EVENT_LEAVE_ROOM}`, data: { room_name } };
  }
  afterInit(server: any) {
    throw new Error('Method not implemented.');
  }
  handleConnection(client: any, ...args: any[]) {
    throw new Error('Method not implemented.');
  }
  handleDisconnect(client: any) {
    throw new Error('Method not implemented.');
  }
}
