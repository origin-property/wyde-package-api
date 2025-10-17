import { QuotationItem } from '@/database/entities/quotation-item.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GraphQLError } from 'graphql';
import { groupBy } from 'lodash';
import { In, Repository } from 'typeorm';
import { CreateQuotationItemInput } from './dto/create-quotation-item.input';
import { UpdateQuotationItemInput } from './dto/update-quotation-item.input';

@Injectable()
export class QuotationItemsService {
  constructor(
    @InjectRepository(QuotationItem)
    private quotationItemRepository: Repository<QuotationItem>,
  ) {}

  async create(
    createQuotationItemInput: CreateQuotationItemInput,
    userId: string,
  ) {
    return this.quotationItemRepository.save({
      ...createQuotationItemInput,
      createdBy: userId,
      updatedBy: userId,
    });
  }

  async findAll() {
    return this.quotationItemRepository.find();
  }

  async findOne(id: string) {
    return this.quotationItemRepository.findOne({ where: { id } });
  }

  async update(
    updateQuotationItemInput: UpdateQuotationItemInput,
    userId: string,
  ) {
    const quotationItem = await this.quotationItemRepository.findOne({
      where: { id: updateQuotationItemInput.id },
    });

    if (!quotationItem) {
      throw new GraphQLError(
        'ไม่พบรายการสินค้าในใบเสนอราคา กรุณาตรวจสอบรหัสรายการสินค้า',
      );
    }

    return this.quotationItemRepository.update(updateQuotationItemInput.id, {
      ...updateQuotationItemInput,
      updatedBy: userId,
    });
  }

  async remove(id: string, userId: string) {
    const quotationItem = await this.quotationItemRepository.findOne({
      where: { id },
    });

    if (!quotationItem) {
      throw new GraphQLError(
        'ไม่พบรายการสินค้าในใบเสนอราคา กรุณาตรวจสอบรหัสรายการสินค้า',
      );
    }

    await this.quotationItemRepository.update(id, {
      deletedBy: userId,
    });

    const deleted = await this.quotationItemRepository.softDelete(id);

    return !!deleted.affected;
  }

  async getQuotationItemsWithIds(ids: readonly string[]) {
    return this.quotationItemRepository.find({
      where: { quotationId: In(ids) },
    });
  }
}
