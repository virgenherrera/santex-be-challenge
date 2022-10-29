import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Coach as CoachEntity,
  Competition as CompetitionEntity,
  Player as PlayerEntity,
  Team as TeamEntity,
} from '../../entities';
import { Competition, Team } from '../models';

@Injectable()
export class DbPopulateService {
  private logger = new Logger(this.constructor.name);

  constructor(
    @InjectRepository(CoachEntity)
    private readonly coachRepository: Repository<CoachEntity>,
    @InjectRepository(CompetitionEntity)
    private readonly competitionRepository: Repository<CompetitionEntity>,
  ) {}

  async saveCompetition(competition: Competition, teams: Team[]) {
    this.logger.verbose(`saving competition: "${competition.name}"`);

    const competitionEntity = Object.assign(
      new CompetitionEntity(),
      competition,
    );
    const teamPromises = teams.map(this.processTeam.bind(this));
    const teamEntities = await Promise.all(teamPromises);
    competitionEntity.teams = teamEntities;

    const storedCompetition = await this.competitionRepository.save(
      competitionEntity,
    );

    this.logger.verbose(`competition: "${competition.name}" stored properly`);

    return storedCompetition;
  }

  private async processTeam({
    id,
    name,
    tla,
    shortName,
    areaName,
    address,
    coach,
    squad,
  }: Team) {
    this.logger.verbose(`preparing team:"${name}" Entity`);

    const teamEntity = new TeamEntity();
    const coachEntity = new CoachEntity();

    Object.assign(teamEntity, { id, name, tla, shortName, areaName, address });

    teamEntity.coach = Object.assign(coachEntity, coach);
    teamEntity.squad = squad.map(v => Object.assign(new PlayerEntity(), v));

    this.logger.verbose(`saving coach: "${coach.id}"`);
    await this.coachRepository.save(coachEntity);

    this.logger.verbose(`team:"${name}" Entity is prepared.`);

    return teamEntity;
  }
}
