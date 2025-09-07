import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Match } from '../match/match.entity';

@Entity('vendors')
export class Vendor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({
    name: 'countries_supported',
    type: 'json',
  })
  countriesSupported: string[];

  @Column({
    name: 'services_offered',
    type: 'json',
  })
  servicesOffered: string[];

  @Column({ name: 'rating', nullable: true })
  rating: number;

  @Column({ name: 'response_sla_hours', nullable: false })
  responseSLAHours: number;

  @OneToMany(() => Match, (match) => match.vendor)
  matches: Match[];
}
