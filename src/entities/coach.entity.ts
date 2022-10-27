import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: Coach.name.toLowerCase() })
export class Coach {
  @PrimaryGeneratedColumn('uuid') uuid: string;
  @PrimaryColumn() id: number;
  @Column() name: string;
  @Column() dateOfBirth: string;
  @Column() nationality: string;
  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}
