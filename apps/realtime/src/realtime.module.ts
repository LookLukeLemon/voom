import { Module } from '@nestjs/common';
import { RealtimeController } from './realtime.controller';
import { RealtimeService } from './realtime.service';
import { EventsModule } from './events/events.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath:
        process.env.NODE_ENV == 'development'
          ? '.env.development'
          : process.env.NODE_ENV == 'production'
          ? '.env.production'
          : '.env.staging',
    }),
    EventsModule,
  ],
  controllers: [RealtimeController],
  providers: [RealtimeService],
})
export class RealtimeModule {}
