import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { GetTeamPlayers } from '../docs';
import { TeamRoute } from '../enums';
import { GetTeamResponse } from '../models';
import { TeamService } from '../services';

@Controller()
export class TeamController {
  constructor(private teamService: TeamService) {}

  @Get(TeamRoute.players)
  @GetTeamPlayers()
  async getPlayers(
    @Param('teamId', ParseIntPipe) teamId: number,
  ): Promise<GetTeamResponse> {
    const { coach, squad } = await this.teamService.getTeam(teamId);
    const res = new GetTeamResponse();

    res.coach = coach;
    res.players = squad;

    return res;
  }
}
