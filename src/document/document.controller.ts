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
import { AuthGuard } from '../auth/gurd/auth.guard';
import { GetDocumentsDto } from './DTO/get-documents.dto';
import httpResponseUtil from '../util/httpResponse.util';

@Controller('document')
export class DocumentController {
  constructor(private documentService: DocumentService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() body: CreateDocumentDto, @Req() req: Request) {
    return httpResponseUtil(
      200,
      'upload document',
      await this.documentService.create(body, req['user']),
    );
  }

  @Get()
  @UseGuards(AuthGuard)
  async search(@Query() query: GetDocumentsDto) {
    return httpResponseUtil(
      200,
      'Get documents',
      await this.documentService.getDocuments(query),
    );
  }
}
