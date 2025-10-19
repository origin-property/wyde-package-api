import { Promotion } from '@/database/entities/promotion.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GraphQLError } from 'graphql';
import { Repository } from 'typeorm';
import { CreatePromotionInput } from './dto/create-promotion.input';
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

  async findOne(id: string) {
    return this.promotionRepository.findOneBy({ id });
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
