import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coach, Competition } from '../entities';
import { ImportLeagueController } from './controllers/import-league.controller';
import { HttpImport } from './imports';
import {
  DbPopulateService,
  FetchRemoteDataService,
  ImportLeagueService,
} from './services';

@Module({
  imports: [
    HttpImport.registerAsync(),
    TypeOrmModule.forFeature([Coach, Competition]),
  ],
  controllers: [ImportLeagueController],
  providers: [ImportLeagueService, FetchRemoteDataService, DbPopulateService],
})
export class ImportLeagueModule {}
