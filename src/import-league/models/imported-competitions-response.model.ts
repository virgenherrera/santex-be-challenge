import { ApiProperty } from '@nestjs/swagger';

export class ImportedCompetitionsResponse {
  @ApiProperty() competitionsCount = 0;
  @ApiProperty() competitions: string[] = [];
  @ApiProperty() teamsCount = 0;
  @ApiProperty() teams: string[] = [];
  @ApiProperty() coachesCount = 0;
  @ApiProperty() coaches: string[] = [];
  @ApiProperty() playersCount = 0;
  @ApiProperty() players: string[] = [];
}
