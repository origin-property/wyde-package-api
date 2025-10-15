import { Quotation } from '@/database/entities/quotation.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GraphQLError } from 'graphql';
import { keyBy } from 'lodash';
import { In, Repository } from 'typeorm';
import { CreateQuotationInput } from './dto/create-quotation.input';
import { UpdateQuotationInput } from './dto/update-quotation.input';

@Injectable()
export class QuotationsService {
  constructor(
    @InjectRepository(Quotation)
    private quotationRepository: Repository<Quotation>,
  ) {}

  create(createQuotationInput: CreateQuotationInput, userId: string) {
    return this.quotationRepository.save({
      ...createQuotationInput,
      createdBy: userId,
      updatedBy: userId,
    });
  }

  async findAll() {
    return this.quotationRepository.find();
  }

  async findOne(id: string) {
    return this.quotationRepository.findOne({ where: { id } });
  }

  async update(
    id: string,
    updateQuotationInput: UpdateQuotationInput,
    userId: string,
  ) {
    const quotation = await this.quotationRepository.findOne({ where: { id } });

    if (!quotation) {
      throw new GraphQLError('ไม่พบใบเสนอราคา กรุณาตรวจสอบรหัสใบเสนอราคา');
    }

    return this.quotationRepository.update(id, {
      ...updateQuotationInput,
      updatedBy: userId,
    });
  }

  async remove(id: string, userId: string) {
    const quotation = await this.quotationRepository.findOne({ where: { id } });

    if (!quotation) {
      throw new GraphQLError('ไม่พบใบเสนอราคา กรุณาตรวจสอบรหัสใบเสนอราคา');
    }

    await this.quotationRepository.update(id, {
      deletedBy: userId,
    });

    const deleted = await this.quotationRepository.softDelete(id);

    return !!deleted.affected;
  }

  async getQuotationWithIds(ids: readonly string[]) {
    const quotations = await this.quotationRepository.find({
      where: { id: In(ids) },
    });

    const key = keyBy(quotations, (quotation) => quotation.id);

    return ids.map((id) => key[id]);
  }
}
