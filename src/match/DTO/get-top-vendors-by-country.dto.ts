import { GetTop3VendorsDto } from '../../vendor/DTO/get-top3-vendors.dto';

export class GetTopVendorsByCountryDto {
  country: string;
  topVendors: GetTop3VendorsDto[];
  documentsCount: number;
}
