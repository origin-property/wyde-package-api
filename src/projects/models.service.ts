import { CRM } from '@/config/data-source.service';
import { SysREMProjectModel } from '@/database/crm/SysREMProjectModel.entity';
import { File } from '@/database/entities/file.entity';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { uniqBy } from 'lodash';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class ModelsService {
  private readonly bucketName: string;

  constructor(
    @InjectRepository(SysREMProjectModel, CRM)
    private readonly modelsRepository: Repository<SysREMProjectModel>,

    @InjectRepository(File)
    private readonly filesRepository: Repository<File>,

    private readonly configService: ConfigService,
  ) {
    this.bucketName = this.configService.getOrThrow<string>('AWS_S3_BUCKET');
  }

  async findAll(projectId: string) {
    return this.modelsRepository.find({
      where: { projectId },
      order: { id: 'ASC' },
    });
  }

  async findOne(id: string) {
    return this.modelsRepository.findOne({ where: { id } });
  }

  async getModelWithIds(datas: readonly { id: string; projectId: string }[]) {
    const models = await this.modelsRepository.find({
      where: [{ isDelete: false }, { isDelete: IsNull() }],
    });

    return datas.map((data) => {
      const model = models.find(
        (model) =>
          model.id.includes(data.id) &&
          model.projectId.includes(data.projectId),
      );

      return model;
    });
  }

  async getModelFileUrl(datas: readonly { id: string; projectId: string }[]) {
    const wheres = uniqBy(datas, ({ projectId }) => projectId).map((data) => ({
      projectId: data.projectId,
    }));

    const files = await this.filesRepository.find({
      where: wheres,
    });

    const urls = await Promise.all(
      datas.map(async (data) => {
        const file = files.find(
          (file) => file.projectId === data.projectId && file.refId === data.id,
        );

        return file
          ? `${this.configService.getOrThrow<string>('AWS_CLOUDFRONT_URL')}/${file.filePath}`
          : `${this.configService.getOrThrow<string>('AWS_CLOUDFRONT_URL')}/model/model.png`;
      }),
    );

    return urls;
  }
}
