import { Test, TestingModule } from '@nestjs/testing';
import { RealtimeController } from './realtime.controller';
import { RealtimeService } from './realtime.service';

describe('RealtimeController', () => {
  let realtimeController: RealtimeController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RealtimeController],
      providers: [RealtimeService],
    }).compile();

    realtimeController = app.get<RealtimeController>(RealtimeController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(realtimeController.getHello()).toBe('Hello World!');
    });
  });
});
