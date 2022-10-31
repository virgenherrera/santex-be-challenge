import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from '../entities';
import { PlayersController } from './controllers';

@Module({
  imports: [TypeOrmModule.forFeature([Player])],
  controllers: [PlayersController],
})
export class LeagueModule {}
