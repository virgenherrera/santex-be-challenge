import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: Player.name.toLowerCase() })
export class Player {
  @PrimaryGeneratedColumn('uuid') uuid: string;
  @PrimaryColumn() id: number;
  @Column() name: string;
  @Column() position: string;
  @Column() dateOfBirth: string;
  @Column() nationality: string;
  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}
