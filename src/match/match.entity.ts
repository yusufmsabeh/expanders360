import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Project } from '../project/project.entity';
import { Vendor } from '../vendor/vendor.entity';

@Entity('matches')
@Unique(['project', 'vendor'])
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'score', nullable: false })
  score: number;

  @ManyToOne(() => Project, (project) => project.matches)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToOne(() => Vendor, (vendor) => vendor.matches)
  @JoinColumn({ name: 'vendor_id' })
  vendor: Vendor;
}
