import { Injectable } from '@nestjs/common';
import CreateVendorDto from './DTO/create-vendor.dto';
import { Vendor } from './vendor.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GetTop3VendorsDto } from './DTO/get-top3-vendors.dto';

@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(Vendor) private vendorRepository: Repository<Vendor>,
  ) {}

  async createVendor(createVendorDto: CreateVendorDto) {
    return await this.vendorRepository.save(createVendorDto);
  }

  async getVendors() {
    return await this.vendorRepository.find();
  }

  async getTop3Vendors(country: string): Promise<GetTop3VendorsDto[]> {
    return await this.vendorRepository
      .createQueryBuilder('vendor')
      .innerJoin('vendor.matches', 'match')
      .where('JSON_CONTAINS(vendor.countriesSupported, JSON_ARRAY(:country))', {
        country,
      })
      .andWhere('match.createdAt >= :date', {
        date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      })
      .groupBy('vendor.id')
      .select([
        'vendor.id AS id',
        'vendor.name AS name',
        'AVG(match.score) AS avgMatchScore',
      ])
      .orderBy('avgMatchScore', 'DESC')
      .limit(3)
      .getRawMany();
  }
}
