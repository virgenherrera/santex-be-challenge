import { ApiProperty } from '@nestjs/swagger';
import { Coach, Player } from '../../entities';

export class GetTeamResponse {
  @ApiProperty() players: Player[];
  @ApiProperty() coach: Coach;
}
