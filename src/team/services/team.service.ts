import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFound } from '../../common/exceptions';
import { Team as TeamEntity } from '../../entities';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(TeamEntity)
    private readonly teamRepository: Repository<TeamEntity>,
  ) {}

  async getTeam(id: number) {
    const team = await this.teamRepository.findOne({
      where: { id },
      relations: {
        coach: true,
        squad: true,
      },
    });

    if (!team) throw new NotFound(`The team with id: '${id}' does not exist`);

    return team;
  }
}
