import { HttpModule, HttpModuleOptions } from '@nestjs/axios';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

export class HttpImport {
  static registerAsync() {
    return HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        HttpImport.getHeaders(new Logger(HttpImport.name), configService),
      inject: [ConfigService],
    });
  }

  private static getHeaders(logger: Logger, configService: ConfigService) {
    logger.log('Looking for "FOOTBALL_DATA_API_KEY" ENV variable');

    const token = configService.get<string>('FOOTBALL_DATA_API_KEY');
    const res: HttpModuleOptions = {
      baseURL: 'https://api.football-data.org/v4/',
    };
    if (!token) {
      const msg =
        '\n\tunable to find "FOOTBALL_DATA_API_KEY" ENV variable.' +
        '\n Please provide "FOOTBALL_DATA_API_KEY" ENV variable and launch the service again.\n';

      logger.error(msg);

      throw new InternalServerErrorException(msg);
    }

    res.headers = {
      'X-Auth-Token': token,
    };

    logger.verbose('successfully located "FOOTBALL_DATA_API_KEY" ENV variable');

    return res;
    ``;
  }
}
