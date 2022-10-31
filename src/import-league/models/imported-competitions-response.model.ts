import { ApiProperty } from '@nestjs/swagger';

export class ImportedCompetitionsResponse {
  @ApiProperty({ description: 'Total imported competitions.' })
  competitionsCount = 0;
  @ApiProperty({ description: 'list of imported competitions.' })
  competitions: string[] = [];
  @ApiProperty({ description: 'Total imported teams.' }) teamsCount = 0;
  @ApiProperty({ description: 'list of imported teams.' }) teams: string[] = [];
  @ApiProperty({ description: 'Total imported coaches.' }) coachesCount = 0;
  @ApiProperty({ description: 'list of imported coaches.' }) coaches: string[] =
    [];
  @ApiProperty({ description: 'Total imported players.' }) playersCount = 0;
  @ApiProperty({ description: 'Total list of imported players.' })
  players: string[] = [];
}
