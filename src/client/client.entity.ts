import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'Company_name' })
  companyName: string;

  @Column({ name: 'contact_email' })
  contactEmail: string;

  @Column()
  password: string;
}
