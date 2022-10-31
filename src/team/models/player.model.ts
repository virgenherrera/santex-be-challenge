import { ApiProperty } from '@nestjs/swagger';
import { Player as PlayerEntity, Team } from '../../entities';

export class Player implements PlayerEntity {
  @ApiProperty() id: number;
  @ApiProperty() name: string;
  @ApiProperty() position: string;
  @ApiProperty() dateOfBirth: string;
  @ApiProperty() nationality: string;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
  team: Team;
}
