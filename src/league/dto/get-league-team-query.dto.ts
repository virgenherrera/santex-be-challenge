import { Transform, TransformFnParams } from 'class-transformer';
import { IsBoolean, IsDefined, IsOptional, IsString } from 'class-validator';

export class GetLeagueTeamQueryDto {
  static boolTransform({ value }: TransformFnParams) {
    return ['1', 'true'].includes(value);
  }

  @IsDefined()
  @IsString()
  teamName: string;

  @IsOptional()
  @Transform(GetLeagueTeamQueryDto.boolTransform)
  @IsBoolean()
  players = false;
}
