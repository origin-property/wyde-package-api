import { File } from '@/database/entities/file.entity';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { GraphQLError } from 'graphql';
import { In, Repository } from 'typeorm';
import { CreateFileInput } from './input/create-file.input';
import { UpdateFileInput } from './input/update-file.input';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,

    private readonly configService: ConfigService,
  ) {}

  private readonly logger = new Logger(FilesService.name);

  async create(createFileInput: CreateFileInput, userId: string) {
    return this.fileRepository.save({
      ...createFileInput,
      fileBucket: this.configService.getOrThrow<string>('AWS_S3_BUCKET'),
      createdBy: userId,
      updatedBy: userId,
    });
  }

  async findAll() {
    return this.fileRepository.find();
  }

  async findOne(id: string) {
    return this.fileRepository.findOne({ where: { id } });
  }

  async update(id: string, updateFileInput: UpdateFileInput, userId: string) {
    const file = await this.fileRepository.findOne({ where: { id } });

    if (!file) {
      throw new GraphQLError('File not found');
    }

    await this.fileRepository
      .createQueryBuilder()
      .update()
      .set({ ...updateFileInput, updatedBy: userId })
      .where('id = :id', { id })
      .execute();

    return this.fileRepository.findOne({ where: { id } });
  }

  async remove(id: string, userId: string) {
    const file = await this.fileRepository.findOne({ where: { id } });

    if (!file) {
      throw new GraphQLError('File not found');
    }

    await this.fileRepository
      .createQueryBuilder()
      .update()
      .set({ deletedBy: userId })
      .where('id = :id', { id })
      .execute();

    const deleted = await this.fileRepository.softDelete(id);

    return !!deleted.affected;
  }

  async createOrUpdateModelFile(
    fileName: string,
    filePath: string,
    modelId: string,
    projectId: string,
    userId: string,
  ) {
    await this.fileRepository.softDelete({
      refId: modelId,
      projectId: projectId,
    });

    const file = await this.fileRepository.save({
      refId: modelId,
      fileName: fileName,
      filePath: filePath,
      fileBucket: this.configService.getOrThrow<string>('AWS_S3_BUCKET'),
      isPublic: true,
      projectId: projectId,
      createdBy: userId,
      updatedBy: userId,
    });

    return file;
  }

  async getFileWithIds(ids: readonly string[]): Promise<File[]> {
    return this.fileRepository.find({ where: { refId: In(ids) } });
  }

  async getFilesWithIds(ids: readonly string[]): Promise<File[]> {
    return this.fileRepository.find({ where: { refId: In(ids) } });
  }
}
