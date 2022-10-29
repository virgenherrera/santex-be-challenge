import { Team as TeamResponse } from '../interfaces';
import { Coach } from './coach.model';
import { Player } from './player.model';

export class Team {
  static mapFromTeamResponse(args: TeamResponse) {
    return new Team(args);
  }

  id: number;
  name: string;
  tla: string;
  shortName: string;
  areaName: string;
  address: string;
  coach: Coach;
  squad: Player[];

  constructor(args: TeamResponse) {
    this.id = args.id;
    this.name = args.name;
    this.tla = args.tla;
    this.shortName = args.shortName;
    this.areaName = args.area.name;
    this.address = args.address;
    this.coach = Coach.mapFromCoachResponse(args.coach);
    this.squad = args.squad.map(Player.maFromSquad);
  }
}
