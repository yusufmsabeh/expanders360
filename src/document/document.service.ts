import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocumentDto } from './DTO/create-document.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Document } from './document.entity';
import { User } from '../user/user.entity';
import { ProjectService } from '../project/project.service';
import { GetDocumentsDto } from './DTO/get-documents.dto';

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

  async getDocuments(getDocumentsDto: GetDocumentsDto) {
    const findQuery = {};
    if (getDocumentsDto.projectId) {
      findQuery['projectId'] = getDocumentsDto.projectId;
    }
    if (getDocumentsDto.tag) {
      findQuery['tags'] = { $in: [getDocumentsDto.tag] };
    }

    if (getDocumentsDto.text) {
      const regex = new RegExp(getDocumentsDto.text, 'i');
      findQuery['$or'] = [
        { title: { $regex: regex } },
        { content: { $regex: regex } },
      ];
    }
    return this.documentModel.find(findQuery).exec();
  }
}
