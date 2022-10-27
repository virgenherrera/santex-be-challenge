import {
  TypeOrmModule,
  TypeOrmModuleOptions,
  TypeOrmOptionsFactory,
} from '@nestjs/typeorm';

export class TypeormConfig implements TypeOrmOptionsFactory {
  static forRootAsync() {
    return TypeOrmModule.forRootAsync({
      useClass: TypeormConfig,
    });
  }

  async getEntities() {
    const entityMap = await import('../entities');

    return Object.values(entityMap);
  }
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    const entities = await this.getEntities();

    return {
      type: 'sqlite',
      name: 'default',
      logging: 'all',
      synchronize: true,
      database: 'db/soccer.sqlite',
      entities,
    };
  }
}
