import { Test, TestingModule } from '@nestjs/testing';
import { EVENT_JOIN_ROOM, EVENT_LEAVE_ROOM } from '../common/Constants';
import IEventGateway from './IEventGateway';
import { MockEventsGateway } from './mock.events.gateway';

describe('EventsService', () => {
  let service: IEventGateway;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ useClass: MockEventsGateway, provide: MockEventsGateway }],
    }).compile();

    service = module.get<IEventGateway>(MockEventsGateway);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it(`should return rooms with 'join_room' when you join the room`, () => {
    const expected = service.joinRoom('Design meeting');
    const toBe = {
      event: EVENT_JOIN_ROOM,
      data: { room_name: 'Design meeting' },
    };

    return expect(expected).toEqual(toBe);
  });

  it(`should return rooms with 'leave_room' when you leave the room`, () => {
    const expected = service.leaveRoom('Engineering theory');
    const toBe = {
      event: EVENT_LEAVE_ROOM,
      data: { room_name: 'Engineering theory' },
    };

    return expect(expected).toEqual(toBe);
  });
});
