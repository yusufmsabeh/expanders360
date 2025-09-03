import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import RoleEnum from './role.enum';

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
}
