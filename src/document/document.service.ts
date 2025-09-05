import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocumentDto } from './DTO/create-document.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Document } from './document.entity';
import { User } from '../user/user.entity';
import { ProjectService } from '../project/project.service';

@Injectable()
export class DocumentService {
  constructor(
    @InjectModel(Document.name)
    private documentModel: Model<Document>,
    private projectService: ProjectService,
  ) {}

  async create(body: CreateDocumentDto, user: User) {
    const hasProject = await this.projectService.hasProject(
      body.projectId,
      user,
    );
    if (!hasProject) {
      throw new NotFoundException('Project not found');
    }
    return await this.documentModel.create(body);
  }
}
