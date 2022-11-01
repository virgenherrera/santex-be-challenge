import { Controller, Logger, Post } from '@nestjs/common';
import { PostImportLeague } from '../docs';
import { ImportLeagueRoute } from '../enums';
import { ImportedCompetitionsResponse } from '../models';
import { ImportLeagueService } from '../services/import-league.service';

@Controller()
export class ImportLeagueController {
  private logger = new Logger(this.constructor.name);

  constructor(private importLeagueService: ImportLeagueService) {}

  @Post(ImportLeagueRoute.importLeagues)
  @PostImportLeague()
  async postImportLeague(): Promise<ImportedCompetitionsResponse> {
    this.logger.verbose('postImportLeague');

    return await this.importLeagueService.exec();
  }
}
