import { Injectable, Logger } from '@nestjs/common';
import { ImportedCompetitionsResponse } from '../models';
import { DbPopulateService } from './db-populate.service';
import { FetchRemoteDataService } from './fetch-remote-data.service';

@Injectable()
export class ImportLeagueService {
  private logger = new Logger(this.constructor.name);

  constructor(
    private fetch: FetchRemoteDataService,
    private db: DbPopulateService,
  ) {}

  async exec() {
    this.logger.log('Begin pulling data from remote API');

    const res = new ImportedCompetitionsResponse();
    const competitions = await this.fetch.getCompetitions();

    if (!competitions) return res;

    for await (const competition of competitions) {
      try {
        const teams = await this.fetch.getCompetitionTeams(competition.code);

        if (!teams.length) continue;

        const competitionInserts = await this.db.saveCompetition(
          competition,
          teams,
        );
        const initialValue: Record<'teams' | 'coaches' | 'players', string[]> =
          { teams: [], coaches: [], players: [] };
        const mappedData = competitionInserts.teams.reduce((acc, curr) => {
          acc.teams.push(curr.name);
          acc.coaches.push(curr.coach.name);
          acc.players.push(...curr.squad.map(v => v.name));

          return acc;
        }, initialValue);

        res.competitionsCount++;
        res.competitions.push(competition.name);

        res.teamsCount += mappedData.teams.length;
        res.teams.push(...mappedData.teams);

        res.coachesCount++;
        res.coaches.push(...mappedData.coaches);

        res.playersCount += mappedData.players.length;
        res.players.push(...mappedData.players);
      } catch (err) {
        this.logger.error(
          `Exception status:${err.status} message:${err.message}`,
        );
      }
    }

    this.logger.verbose('Completed');

    return res;
  }
}
