import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
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

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @ManyToOne(() => Project, (project) => project.matches)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToOne(() => Vendor, (vendor) => vendor.matches)
  @JoinColumn({ name: 'vendor_id' })
  vendor: Vendor;
}
