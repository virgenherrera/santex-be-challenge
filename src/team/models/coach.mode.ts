import { ApiProperty } from '@nestjs/swagger';
import { Coach as CoachEntity, Team } from '../../entities';

export class Coach implements CoachEntity {
  @ApiProperty() id: number;
  @ApiProperty() name: string;
  @ApiProperty() dateOfBirth: string;
  @ApiProperty() nationality: string;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
  @ApiProperty() team: Team;
}
