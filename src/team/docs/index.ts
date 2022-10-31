import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TeamRoute } from '../enums';
import { GetTeamResponse } from '../models';

export function GetTeamPlayers() {
  return applyDecorators(
    ApiOperation({
      summary: `GET ${TeamRoute.players}`,
      description: 'Get  team players and coach.',
    }),
    ApiResponse({
      type: GetTeamResponse,
      status: 200,
      description: `${GetTeamResponse.name} instance containing data team members.`,
    }),
  );
}
