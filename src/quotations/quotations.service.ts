import { Quotation } from '@/database/entities/quotation.entity';
import { QuotationStatus } from '@/shared/enums/quotation.enum';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import dayjs from 'dayjs';
import { GraphQLError } from 'graphql';
import { keyBy } from 'lodash';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import {
  Between,
  FindManyOptions,
  FindOptionsWhere,
  In,
  Like,
  Repository,
} from 'typeorm';
import { CreateQuotationInput } from './dto/create-quotation.input';
import { SearchQuotationArgs } from './dto/search-quotation.agrs';
import { UpdateQuotationInput } from './dto/update-quotation.input';

@Injectable()
export class QuotationsService {
  constructor(
    @InjectRepository(Quotation)
    private quotationRepository: Repository<Quotation>,
  ) {}

  async generateCode() {
    const today = dayjs();
    const year = today.format('YY');
    const month = today.format('MM');
    const count = await this.quotationRepository.count({
      where: {
        createdAt: Between(
          today.startOf('month').toDate(),
          today.endOf('month').toDate(),
        ),
      },
      withDeleted: true,
    });

    const current = `000${count + 1}`;
    const code = `Q-${year}${month}-${current.slice(-4)}`;

    return code;
  }

  async create(createQuotationInput: CreateQuotationInput, userId: string) {
    const code = await this.generateCode();

    return this.quotationRepository.save({
      ...createQuotationInput,
      code,
      createdBy: userId,
      updatedBy: userId,
      items: createQuotationInput.items.map((item) => ({
        ...item,
        createdBy: userId,
        updatedBy: userId,
      })),
    });
  }

  async searchWithPaginate(args: SearchQuotationArgs) {
    const { page, limit, searchText } = args;

    const wheres: FindOptionsWhere<Quotation>[] = [];

    if (searchText && searchText.trim() !== '') {
      const query = `%${searchText.trim()}%`;

      wheres.push(
        { code: Like(query) },
        { customerFirstName: Like(query) },
        { customerLastName: Like(query) },
        { customerPhone: Like(query) },
        { customerEmail: Like(query) },
        { unitId: Like(query) },
        { unitNumber: Like(query) },
      );
    }

    return this.paginate(
      { page, limit },
      {
        where: wheres.length > 0 ? wheres : undefined,
        order: { updatedAt: 'DESC' },
      },
    );
  }

  async findAll() {
    return this.quotationRepository.find();
  }

  async findOne(id: string) {
    return this.quotationRepository.findOne({ where: { id } });
  }

  private async paginate(
    pageOptions: IPaginationOptions,
    findOptions?: FindManyOptions<Quotation>,
  ): Promise<Pagination<Quotation>> {
    return paginate<Quotation>(
      this.quotationRepository,
      pageOptions,
      findOptions,
    );
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

    await this.quotationRepository.update(id, {
      ...updateQuotationInput,
      updatedBy: userId,
    });

    return this.quotationRepository.findOne({ where: { id } });
  }

  async updateStatus(id: string, status: QuotationStatus, userId: string) {
    const quotation = await this.quotationRepository.findOne({ where: { id } });

    if (!quotation) {
      throw new GraphQLError('ไม่พบใบเสนอราคา กรุณาตรวจสอบรหัสใบเสนอราคา');
    }

    await this.quotationRepository.update(id, {
      status,
      updatedBy: userId,
    });

    return this.quotationRepository.findOne({ where: { id } });
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
