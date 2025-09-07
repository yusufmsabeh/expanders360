import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  RelationOptions,
  OneToOne,
  OneToMany,
} from 'typeorm';
import StatusEnum from './ENUM/status.enum';
import { User } from '../user/user.entity';
import { Match } from '../match/match.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'title', nullable: false })
  title: string;

  @Column({ name: 'services_needed', nullable: false, type: 'json' })
  servicesNeeded: string[];

  @Column({ name: 'country', nullable: false })
  country: string;

  @Column({ name: 'budget', nullable: false })
  budget: number;

  @Column({ name: 'status', enum: StatusEnum })
  status: string;

  @ManyToOne(() => User, (user: User) => user.projects)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Match, (match) => match.project)
  matches: Match[];
}
