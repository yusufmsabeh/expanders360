import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Roles } from '../auth/roles.decorator';
import { AuthGuard } from '../auth/auth.guard';
import RoleEnum from '../user/role.enum';
import CreateVendorDto from './DTO/create-vendor.dto';
import { VendorService } from './vendor.service';
import httpResponseUtil from '../util/httpResponse.util';

@Controller('vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}
  @Post()
  @Roles([RoleEnum.admin])
  @UseGuards(AuthGuard)
  async createVendor(@Body() body: CreateVendorDto) {
    const vendor = await this.vendorService.createVendor(body);
    return httpResponseUtil(200, 'vendor created', vendor);
  }

  @Get()
  @Roles([RoleEnum.admin])
  @UseGuards(AuthGuard)
  async getVendors() {
    const vendors = await this.vendorService.getVendors();
    return httpResponseUtil(200, 'vendors retrieved', vendors);
  }
}
