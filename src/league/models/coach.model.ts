import { ApiProperty } from '@nestjs/swagger';

export class Coach {
  @ApiProperty() id: number;
  @ApiProperty() name: string;
  @ApiProperty() dateOfBirth: string;
  @ApiProperty() nationality: string;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}
