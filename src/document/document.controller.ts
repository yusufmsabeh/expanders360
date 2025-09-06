import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateDocumentDto } from './DTO/create-document.dto';
import { DocumentService } from './document.service';
import { AuthGuard } from '../auth/auth.guard';
import { GetDocumentsDto } from './DTO/get-documents.dto';

@Controller('document')
export class DocumentController {
  constructor(private documentService: DocumentService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() body: CreateDocumentDto, @Req() req: Request) {
    return await this.documentService.create(body, req['user']);
  }

  @Get()
  async search(@Query() query: GetDocumentsDto) {
    return await this.documentService.getDocuments(query);
  }
}
