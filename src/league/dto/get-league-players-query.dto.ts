import { IsOptional, IsString } from 'class-validator';

export class GetLeaguePlayersDto {
  @IsOptional()
  @IsString()
  teamName = null;
}
