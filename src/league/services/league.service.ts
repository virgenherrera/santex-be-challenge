import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFound } from '../../common/exceptions';
import {
  Competition as CompetitionEntity,
  Player as PlayerEntity,
  Team as TeamEntity,
} from '../../entities';

@Injectable()
export class LeagueService {
  constructor(
    @InjectRepository(CompetitionEntity)
    private readonly competitionRepository: Repository<CompetitionEntity>,
    @InjectRepository(TeamEntity)
    private readonly teamRepository: Repository<TeamEntity>,
    @InjectRepository(PlayerEntity)
    private readonly playerRepository: Repository<PlayerEntity>,
  ) {}

  async getPlayers(
    leagueCode: string,
    teamName?: string,
  ): Promise<PlayerEntity[]> {
    await this.leagueExists(leagueCode);

    const query = this.playerRepository
      .createQueryBuilder('player')
      .innerJoin('player.team', 'team')
      .innerJoin('team.competition', 'competition')
      .where('competition.code = :leagueCode', { leagueCode });

    if (teamName) {
      await this.teamExists(teamName);

      query.andWhere('team.name = :teamName', { teamName });
    }

    return query.getMany();
  }

  async getTeam(
    leagueCode: string,
    teamName: string,
    getPlayers?: boolean,
  ): Promise<TeamEntity> {
    await this.leagueExists(leagueCode);

    const queryBuilder = await this.teamRepository.createQueryBuilder('team');

    if (getPlayers) queryBuilder.innerJoinAndSelect('team.squad', 'squad');

    queryBuilder.where('team.name = :teamName', { teamName });

    console.log(queryBuilder.getQueryAndParameters());

    const team = await queryBuilder.getOne();

    if (!team)
      throw new NotFound(`The team with name: '${teamName}' does not exist`);

    return team;
  }

  private async leagueExists(leagueCode: string): Promise<CompetitionEntity> {
    const competition = await this.competitionRepository
      .createQueryBuilder('competition')
      .where('competition.code = :leagueCode', { leagueCode })
      .getOne();

    if (!competition)
      throw new NotFound(
        `The league with code: '${leagueCode}' does not exist`,
      );

    return competition;
  }

  private async teamExists(teamName: string): Promise<TeamEntity> {
    const team = await this.teamRepository
      .createQueryBuilder('team')
      .where('team.name = :teamName', { teamName })
      .getOne();

    if (!team)
      throw new NotFound(`The team with name: '${teamName}' does not exist`);

    return team;
  }
}
