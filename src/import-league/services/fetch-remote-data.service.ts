import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import {
  catchError,
  filter,
  firstValueFrom,
  from,
  map,
  of,
  switchMap,
  toArray,
} from 'rxjs';
import { CompetitionsResponse, CompetitionTeamsResponse } from '../interfaces';
import { Competition, Team } from '../models';

@Injectable()
export class FetchRemoteDataService {
  private logger = new Logger(this.constructor.name);
  private endpoints = {
    competitions: 'competitions/',
    competitionTeams: 'competitions/:competitionCode/teams',
  };

  constructor(private readonly httpService: HttpService) {}

  async getCompetitions() {
    this.logger.log('fetching competitions.');

    const data$ = of(this.endpoints.competitions).pipe(
      switchMap(endpointUrl =>
        this.httpService.get<CompetitionsResponse>(endpointUrl),
      ),
      switchMap(res => from(res.data.competitions)),
      filter(competition => !!competition.code),
      map(Competition.mapFromCompetitionResponse),
      toArray(),
      catchError(err => {
        this.logger.error('Error getting competitions', err.stack);

        return of(null);
      }),
    );

    this.logger.log('competitions acquired.');

    return firstValueFrom(data$);
  }

  async getCompetitionTeams(competitionCode: string) {
    this.logger.log(
      `fetching getCompetitionTeams for code: "${competitionCode}".`,
    );

    const data$ = of(this.endpoints.competitionTeams).pipe(
      map(rawUrl => rawUrl.replace(':competitionCode', competitionCode)),
      switchMap(endpointUrl =>
        this.httpService.get<CompetitionTeamsResponse>(endpointUrl),
      ),
      switchMap(res => from(res.data.teams)),
      map(Team.mapFromTeamResponse),
      toArray(),
      catchError(err => {
        if (err.response.data.errorCode === 403) {
          this.logger.error(err.response.data.message);
        }

        return of([] as Team[]);
      }),
    );

    this.logger.log('competitionTeams acquired.');

    return firstValueFrom(data$);
  }
}
