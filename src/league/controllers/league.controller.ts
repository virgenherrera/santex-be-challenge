import { Controller, Get, Param, Query } from '@nestjs/common';
import { DtoValidation } from '../../common/pipes';
import { GetLeaguePlayersDto, GetLeagueTeamQueryDto } from '../dto';
import { LeagueRoute } from '../enums';
import { LeagueService } from '../services';

@Controller()
export class LeagueController {
  constructor(private playersService: LeagueService) {}

  @Get(LeagueRoute.players)
  async getLeaguePlayers(
    @Param('leagueCode') leagueCode: string,
    @Query(DtoValidation.pipe) query: GetLeaguePlayersDto,
  ) {
    return this.playersService.getPlayers(leagueCode, query.teamName);
  }

  @Get(LeagueRoute.team)
  async getLeagueTeam(
    @Param('leagueCode') leagueCode: string,
    @Query(DtoValidation.pipe) query: GetLeagueTeamQueryDto,
  ) {
    console.log(query);

    return this.playersService.getTeam(
      leagueCode,
      query.teamName,
      query.players,
    );
  }
}
