import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ImportLeagueRoute } from '../enums';
import { ImportedCompetitionsResponse } from '../models';

export function PostImportLeague() {
  return applyDecorators(
    ApiOperation({
      summary: `POST ${ImportLeagueRoute.importLeagues}`,
      description: 'Pull data from remote API and populates DB.',
    }),
    ApiResponse({
      type: ImportedCompetitionsResponse,
      status: 201,
      description: `${ImportedCompetitionsResponse.name} instance containing data about current running service.`,
    }),
  );
}
