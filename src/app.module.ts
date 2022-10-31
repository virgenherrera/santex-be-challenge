import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { LogRequestMiddleware } from './common/middleware';
import { ImportLeagueModule } from './import-league/import-league.module';
import { TypeormConfig } from './imports';
import { LeagueModule } from './league/league.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
    CommonModule,
    TypeormConfig.forRootAsync(),
    ImportLeagueModule,
    LeagueModule,
  ],
  providers: [Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogRequestMiddleware).forRoutes('*');
  }
}
