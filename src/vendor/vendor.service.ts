import { Injectable } from '@nestjs/common';
import CreateVendorDto from './DTO/create-vendor.dto';
import { Vendor } from './vendor.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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
}
