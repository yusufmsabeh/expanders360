import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import RoleEnum from './ENUM/role.enum';
import { Project } from '../project/project.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'Company_name', nullable: true })
  companyName: string;

  @Column({ name: 'contact_email', unique: true, nullable: false })
  contactEmail: string;

  @Column({ name: 'role', enum: RoleEnum })
  role: RoleEnum;

  @Column()
  password: string;

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];
}
