import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Coach } from './coach.entity';
import { Competition } from './competition.entity';
import { Player } from './player.entity';

@Entity({ name: Team.name.toLowerCase() })
export class Team {
  @PrimaryColumn() id: number;
  @Column() name: string;
  @Column() tla: string;
  @Column() shortName: string;
  @Column() areaName: string;
  @Column() address: string;
  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;

  /* --- Relationships --- */
  @ManyToOne(() => Competition, competition => competition.teams)
  competition: Competition;

  @OneToOne(() => Coach, { cascade: true })
  @JoinColumn()
  coach: Coach;

  @OneToMany(() => Player, player => player.team, { cascade: true })
  squad: Player[];
}
