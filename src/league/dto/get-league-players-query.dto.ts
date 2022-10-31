import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetLeaguePlayersDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  teamName = null;
}
