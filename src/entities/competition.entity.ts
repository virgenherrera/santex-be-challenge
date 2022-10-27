import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: Competition.name.toLowerCase() })
export class Competition {
  @PrimaryGeneratedColumn('uuid') uuid: string;
  @PrimaryColumn() id: number;
  @Column() name: string;
  @Column() code: string;
  @Column() areaName: string;
  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}
