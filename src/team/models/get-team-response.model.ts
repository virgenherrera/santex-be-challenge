import { ApiProperty } from '@nestjs/swagger';
import { Coach } from './coach.mode';
import { Player } from './player.model';

export class GetTeamResponse {
  @ApiProperty({ isArray: true, type: Player }) players: Player[];
  @ApiProperty() coach: Coach;
}
