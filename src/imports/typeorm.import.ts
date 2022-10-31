import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Environment } from '../common/enums';

export class TypeormConfig {
  static forRootAsync() {
    return TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const isTestEnv = configService.get('NODE_ENV') === Environment.test;
        const entityMap = await import('../entities');
        const entities = Object.values(entityMap);
        const database = isTestEnv ? 'dist/test-db.sqlite' : 'db/soccer.sqlite';
        const options: TypeOrmModuleOptions = {
          type: 'sqlite',
          name: 'default',
          logging: 'all',
          synchronize: true,
          database,
          entities,
        };

        if (isTestEnv) Object.assign(options, { logging: false });

        return options;
      },
      inject: [ConfigService],
    });
  }
}
