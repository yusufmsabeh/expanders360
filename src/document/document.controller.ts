import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateDocumentDto } from './DTO/create-document.dto';
import { DocumentService } from './document.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('document')
export class DocumentController {
  constructor(private documentService: DocumentService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() body: CreateDocumentDto, @Req() req: Request) {
    return await this.documentService.create(body, req['user']);
  }
}
