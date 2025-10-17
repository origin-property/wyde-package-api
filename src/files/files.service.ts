import { File } from '@/database/entities/file.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GraphQLError } from 'graphql';
import { groupBy, keyBy } from 'lodash';
import { In, Repository } from 'typeorm';
import { CreateFileInput } from './dto/create-file.input';
import { UpdateFileInput } from './dto/update-file.input';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FilesService {
  private readonly bucketName: string;

  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,

    private readonly configService: ConfigService,
  ) {
    this.bucketName = this.configService.getOrThrow<string>('AWS_S3_BUCKET');
  }

  private readonly logger = new Logger(FilesService.name);

  async create(createFileInput: CreateFileInput, userId: string) {
    return this.fileRepository.save({
      ...createFileInput,
      fileBucket: this.bucketName,
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

  async getFileWithIds(ids: readonly string[]): Promise<File[]> {
    return this.fileRepository.find({ where: { id: In(ids) } });
  }

  async getFilesWithIds(ids: readonly string[]): Promise<File[]> {
    return this.fileRepository.find({ where: { id: In(ids) } });
  }
}
