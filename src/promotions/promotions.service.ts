import { Promotion } from '@/database/entities/promotion.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GraphQLError } from 'graphql';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { FindManyOptions, FindOptionsWhere, Like, Repository } from 'typeorm';
import { CreatePromotionInput } from './input/create-promotion.input';
import { SearchPromotionArgs } from './input/search-promotion.agrs';
import { UpdatePromotionInput } from './input/update-promotion.input';

@Injectable()
export class PromotionsService {
  constructor(
    @InjectRepository(Promotion)
    private promotionRepository: Repository<Promotion>,
  ) {}

  async create(createPromotionInput: CreatePromotionInput, userId: string) {
    return this.promotionRepository.save({
      ...createPromotionInput,
      createdBy: userId,
      updatedBy: userId,
    });
  }

  async findAll() {
    return this.promotionRepository.find();
  }

  async searchWithPaginate(args: SearchPromotionArgs) {
    const { page, limit, kind, type, isActive, searchText } = args;

    const baseWhere: FindOptionsWhere<Promotion> = {
      ...(kind && { kind }),
      ...(kind && { type }),
      ...(isActive !== undefined && { isActive }),
    };

    const wheres: FindOptionsWhere<Promotion>[] = [];

    if (searchText?.trim()) {
      const query = `%${searchText.trim()}%`;
      wheres.push(
        { code: Like(query), ...baseWhere },
        { name: Like(query), ...baseWhere },
        { description: Like(query), ...baseWhere },
      );
    }

    return this.paginate(
      { page, limit },
      {
        where: wheres.length > 0 ? wheres : baseWhere,
        order: { updatedAt: 'DESC' },
      },
    );
  }

  async findOne(id: string) {
    return this.promotionRepository.findOneBy({ id });
  }

  private async paginate(
    pageOptions: IPaginationOptions,
    findOptions?: FindManyOptions<Promotion>,
  ): Promise<Pagination<Promotion>> {
    return paginate<Promotion>(
      this.promotionRepository,
      pageOptions,
      findOptions,
    );
  }

  async update(
    id: string,
    updatePromotionInput: UpdatePromotionInput,
    userId: string,
  ) {
    const promotion = await this.promotionRepository.findOne({ where: { id } });

    if (!promotion) {
      throw new GraphQLError('ไม่พบโปรโมชั่น กรุณาลองใหม่อีกครั้ง');
    }

    await this.promotionRepository.update(id, {
      ...updatePromotionInput,
      updatedBy: userId,
    });

    return this.promotionRepository.findOne({ where: { id } });
  }

  async updateActive(id: string, isActive: boolean, userId: string) {
    const promotion = await this.promotionRepository.findOne({ where: { id } });
    if (!promotion) {
      throw new GraphQLError('ไม่พบโปรโมชั่น กรุณาลองใหม่อีกครั้ง');
    }

    await this.promotionRepository.update(id, { isActive, updatedBy: userId });

    return this.promotionRepository.findOne({ where: { id } });
  }

  async remove(id: string, userId: string) {
    const promotion = await this.promotionRepository.findOne({ where: { id } });

    if (!promotion) {
      throw new GraphQLError('ไม่พบโปรโมชั่น กรุณาลองใหม่อีกครั้ง');
    }

    await this.promotionRepository.update(id, {
      deletedBy: userId,
    });

    const deleted = await this.promotionRepository.softDelete(id);

    return !!deleted.affected;
  }
}
