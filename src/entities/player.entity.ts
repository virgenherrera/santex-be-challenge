import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Team } from './team.entity';

@Entity({ name: Player.name.toLowerCase() })
export class Player {
  @PrimaryColumn() id: number;
  @Column() name: string;
  @Column({ nullable: true }) position: string;
  @Column({ nullable: true }) dateOfBirth: string;
  @Column() nationality: string;
  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;

  /* --- Relationships --- */
  @ManyToOne(() => Team, team => team.squad)
  team: Team;
}
