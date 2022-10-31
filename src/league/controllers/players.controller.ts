import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { LeagueRoute } from '../enums';

@Controller()
export class PlayersController {
  @Get(LeagueRoute.players)
  async getLeaguePlayers(@Param('leagueId', ParseIntPipe) leagueId: number) {
    return { leagueId };
  }
}
