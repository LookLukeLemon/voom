import { NestFactory } from '@nestjs/core';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { RealtimeModule } from './realtime.module';

async function bootstrap() {
  const app = await NestFactory.create(RealtimeModule);
  app.useWebSocketAdapter(new IoAdapter(app));
  await app.listen(3000);
}
bootstrap();
