import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Team } from './team.entity';

@Entity({ name: Coach.name.toLowerCase() })
export class Coach {
  @PrimaryGeneratedColumn() id: number;
  @Column({ nullable: true }) name: string;
  @Column({ nullable: true }) dateOfBirth: string;
  @Column({ nullable: true }) nationality: string;
  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;

  /* --- Relationships --- */
  @OneToOne(() => Team)
  @JoinColumn()
  team: Team;
}
