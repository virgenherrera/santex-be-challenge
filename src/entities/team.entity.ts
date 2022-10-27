import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: Team.name.toLowerCase() })
export class Team {
  @PrimaryGeneratedColumn('uuid') uuid: string;
  @PrimaryColumn() id: number;
  @Column() name: string;
  @Column() tla: string;
  @Column() shortName: string;
  @Column() areaName: string;
  @Column() address: string;
  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}
