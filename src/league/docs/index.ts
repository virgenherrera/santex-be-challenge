import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { GetLeaguePlayersDto } from '../dto';
import { LeagueRoute } from '../enums';
import { Player, Team } from '../models';

export function GetLeaguePlayers() {
  return applyDecorators(
    ApiOperation({
      summary: `GET ${LeagueRoute.players}`,
      description: `Gets a list of players in league.`,
    }),
    ApiQuery({
      type: GetLeaguePlayersDto,
    }),
    ApiResponse({
      type: [Player],
      status: 200,
      description: `a list of ${Player.name} instances.`,
    }),
  );
}

export function GetLeagueTeam() {
  return applyDecorators(
    ApiOperation({
      summary: `GET ${LeagueRoute.team}`,
      description: `Gets a team instance.`,
    }),
    ApiQuery({
      type: GetLeaguePlayersDto,
    }),
    ApiResponse({
      type: Team,
      status: 200,
      description: `a ${Team.name} instance that optionally has a player list.`,
    }),
  );
}
