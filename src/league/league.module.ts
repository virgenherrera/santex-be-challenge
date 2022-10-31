import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Competition, Player, Team } from '../entities';
import { LeagueController } from './controllers';
import { LeagueService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Competition, Team, Player])],
  controllers: [LeagueController],
  providers: [LeagueService],
})
export class LeagueModule {}
