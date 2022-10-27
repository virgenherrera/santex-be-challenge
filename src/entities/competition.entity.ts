import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Team } from './team.entity';

@Entity({ name: Competition.name.toLowerCase() })
export class Competition {
  @PrimaryColumn() id: number;
  @Column() name: string;
  @Column() code: string;
  @Column() areaName: string;
  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;

  /* --- Relationships --- */
  @OneToMany(() => Team, team => team.competition, { cascade: true })
  teams: Team[];
}
