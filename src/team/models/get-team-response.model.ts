import { ApiProperty } from '@nestjs/swagger';
import { Coach, Player } from '../../league/models';

export class GetTeamResponse {
  @ApiProperty({ isArray: true, type: Player }) players: Player[];
  @ApiProperty() coach: Coach;
}
