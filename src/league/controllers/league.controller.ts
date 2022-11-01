import { Controller, Get, Param, Query } from '@nestjs/common';
import { DtoValidation } from '../../common/pipes';
import { GetLeaguePlayers, GetLeagueTeam } from '../docs';
import { GetLeaguePlayersDto, GetLeagueTeamQueryDto } from '../dto';
import { LeagueRoute } from '../enums';
import { Player } from '../models';
import { LeagueService } from '../services';

@Controller()
export class LeagueController {
  constructor(private playersService: LeagueService) {}

  @Get(LeagueRoute.players)
  @GetLeaguePlayers()
  async getLeaguePlayers(
    @Param('leagueCode') leagueCode: string,
    @Query(DtoValidation.pipe) query: GetLeaguePlayersDto,
  ): Promise<Player[]> {
    return this.playersService.getPlayers(leagueCode, query.teamName);
  }

  @Get(LeagueRoute.team)
  @GetLeagueTeam()
  async getLeagueTeam(
    @Param('leagueCode') leagueCode: string,
    @Query(DtoValidation.pipe) { teamName, players }: GetLeagueTeamQueryDto,
  ) {
    return this.playersService.getTeam(leagueCode, teamName, players);
  }
}
