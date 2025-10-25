import { ApiKey } from '@/database/entities/api-key.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import dayjs from 'dayjs';
import { Repository } from 'typeorm';

@Injectable()
export class ApiKeyService {
  constructor(
    @InjectRepository(ApiKey)
    private readonly apiKeyRepository: Repository<ApiKey>,
  ) {}

  async validate(apiKey: string) {
    const apiKeyEntity = await this.apiKeyRepository.findOne({
      where: { apiKey, isActive: true },
    });

    if (!apiKeyEntity) {
      return null;
    }

    await this.apiKeyRepository.update(apiKeyEntity.id, {
      lastUsedAt: dayjs().toDate(),
      usageCount: apiKeyEntity.usageCount + 1,
    });

    return apiKeyEntity;
  }
}
