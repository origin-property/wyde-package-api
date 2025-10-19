import { Promotion } from '@/database/entities/promotion.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GraphQLError } from 'graphql';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { CreatePromotionInput } from './dto/create-promotion.input';
import { SearchPromotionArgs } from './dto/search-promotion.agrs';
import { UpdatePromotionInput } from './dto/update-promotion.input';

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
    const { page, limit, kind, type } = args;

    const wheres: FindOptionsWhere<Promotion> = {
      ...(kind && { kind }),
      ...(kind && { type }),
    };

    return this.paginate(
      { page, limit },
      {
        where: wheres,
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
    const quotation = await this.promotionRepository.findOne({ where: { id } });

    if (!quotation) {
      throw new GraphQLError('ไม่พบข้อมูล กรุณาลองใหม่อีกครั้ง');
    }

    await this.promotionRepository.update(id, {
      ...updatePromotionInput,
      updatedBy: userId,
    });

    return this.promotionRepository.findOne({ where: { id } });
  }

  async remove(id: string, userId: string) {
    const quotation = await this.promotionRepository.findOne({ where: { id } });

    if (!quotation) {
      throw new GraphQLError('ไม่พบข้อมูล กรุณาลองใหม่อีกครั้ง');
    }

    await this.promotionRepository.update(id, {
      deletedBy: userId,
    });

    const deleted = await this.promotionRepository.softDelete(id);

    return !!deleted.affected;
  }
}
