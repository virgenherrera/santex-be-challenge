import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Competition, Player, Team } from '../entities';
import { PlayersController } from './controllers';
import { PlayersService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Competition, Team, Player])],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class LeagueModule {}
