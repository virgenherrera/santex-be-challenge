import { Controller, Get, Param, Query } from '@nestjs/common';
import { DtoValidation } from '../../common/pipes';
import { GetLeaguePlayersDto } from '../dto';
import { LeagueRoute } from '../enums';
import { PlayersService } from '../services';

@Controller()
export class PlayersController {
  constructor(private playersService: PlayersService) {}

  @Get(LeagueRoute.players)
  async getLeaguePlayers(
    @Param('leagueCode') leagueCode: string,
    @Query(DtoValidation.pipe) query: GetLeaguePlayersDto,
  ) {
    return this.playersService.getLeaguePlayers(leagueCode, query.teamName);
  }
}
