import { Test } from '@nestjs/testing';
import { RealtimeController } from './realtime.controller';
import { RealtimeService } from './realtime.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

describe('RealtimeController', () => {
  let controller: RealtimeController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [RealtimeController],
    })
      .useMocker((token) => {
        if (token === RealtimeService) {
          return {
            getHello: jest.fn().mockResolvedValue(`Hello World!`),
            ping: jest.fn().mockResolvedValue(true),
          };
        }

        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    controller = moduleRef.get(RealtimeController);
  });

  describe(`getHello()'`, () => {
    it('should contain "Hello World!"', async () => {
      expect(await controller.getHello()).toContain('Hello World!');
    });
  });

  describe(`ping()`, () => {
    it('should return true', async () => {
      expect(await controller.ping()).toBe(false);
    });
  });
});
