import { Public } from '@/shared/decorators/public.decorator';
import { Controller, Get, NotFoundException, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { QuotationsGenerateService } from './quotations-generate.service';

@Controller('quotations')
export class QuotationsController {
  constructor(
    private readonly quotationsGenerateService: QuotationsGenerateService,
  ) {}

  @Public()
  @Get('/generate/:id')
  async generatePDF(@Res() res: Response, @Param('id') id: string) {
    const quotation = await this.quotationsGenerateService.findOne(id);

    if (!quotation) {
      throw new NotFoundException('ไม่พบใบเสนอราคา');
    }

    const buffer = await this.quotationsGenerateService.generatePDF(quotation);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename=${id}.pdf`,
      'Content-Length': buffer.length,
    });

    res.end(buffer);
  }
}
