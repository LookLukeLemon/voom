import { Test, TestingModule } from '@nestjs/testing';
import { EventsGateway } from './events.gateway';

describe('EventsService', () => {
  let service: EventsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsGateway],
    }).compile();

    service = module.get<EventsGateway>(EventsGateway);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
