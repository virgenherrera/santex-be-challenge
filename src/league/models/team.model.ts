import { ApiProperty } from '@nestjs/swagger';
import { Player } from '../../entities';

export class Team {
  @ApiProperty() id: number;
  @ApiProperty() name: string;
  @ApiProperty() tla: string;
  @ApiProperty() shortName: string;
  @ApiProperty() areaName: string;
  @ApiProperty() address: string;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
  @ApiProperty({
    type: Player,
    isArray: true,
    required: false,
    description:
      'this property will appear only when provided Query.players=true is provided.',
  })
  squad?: Player[];
}
