import { Injectable } from '@nestjs/common';
import axios from 'axios';
import dayjs from 'dayjs';
import PDFDocument from 'pdfkit-table';

import { CRM } from '@/config/data-source.service';
import { SysMasterUnits } from '@/database/crm/SysMasterUnits.entity';
import { SysREMProjectModel } from '@/database/crm/SysREMProjectModel.entity';
import { File } from '@/database/entities/file.entity';
import { Quotation } from '@/database/entities/quotation.entity';
import { AttachmentType } from '@/shared/enums/file.enum';
import { ProductItemType } from '@/shared/enums/product.enum';
import { UploadService } from '@/upload/upload.service';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import fs from 'fs';
import { sumBy } from 'lodash';
import numeral from 'numeral';
import sharp from 'sharp';
import { Repository } from 'typeorm';
import wordcut from 'wordcut';

wordcut.init();

// Constants
const FONTS = {
  REGULAR: 'Regular',
  BOLD: 'Bold',
  EXTRA_LIGHT: 'ExtraLight',
  LIGHT: 'Light',
  MEDIUM: 'Medium',
  SEMI_BOLD: 'SemiBold',
  EXTRA_BOLD: 'ExtraBold',
  BLACK: 'Black',
} as const;

const FONT_PATHS = {
  REGULAR: 'public/fonts/NotoSansThai-Regular.ttf',
  BOLD: 'public/fonts/NotoSansThai-Bold.ttf',
  EXTRA_LIGHT: 'public/fonts/NotoSansThai-ExtraLight.ttf',
  LIGHT: 'public/fonts/NotoSansThai-Light.ttf',
  MEDIUM: 'public/fonts/NotoSansThai-Medium.ttf',
  SEMI_BOLD: 'public/fonts/NotoSansThai-SemiBold.ttf',
  EXTRA_BOLD: 'public/fonts/NotoSansThai-ExtraBold.ttf',
  BLACK: 'public/fonts/NotoSansThai-Black.ttf',
} as const;

const ASSETS = {
  LOGO: 'public/images/wyde-logo.png',
  BANK_LOGO: 'public/images/bank/kasikorn-bank.png',
} as const;

const COMPANY_INFO = {
  ACCOUNT_NUMBER: 'Wyde Interior 026-3-33206-7',
  ACCOUNT_BANK: 'Kasikorn Bank  Branch Samrong',
  LOCATION:
    'Wyde Interior Co., Ltd. : 496 Moo 9 Soi Bearing 16 Sukhumvit 107 Rd., Samrong Nua Mueang Samut Prakan , Taxpayer : 0115559025495',
} as const;

const PDF_CONFIG = {
  SIZE: 'A4',
  LAYOUT: 'portrait',
  MARGINS: { top: 20, bottom: 20, left: 20, right: 20 },
  IMAGE_SIZE: { width: 60, product: 100 },
  MIN_ROW_HEIGHT: 40,
} as const;

// Types
interface DataSourceItem {
  id: string;
  orderIndex?: number;
  isPackageItem: boolean;
  data: any;
}

interface TableData {
  item: string;
  description: string;
  size: string;
  quantity: string;
  price: string;
  totalPrice: string;
  image?: string;
}

interface ImageData {
  id: string;
  base64: string;
}

@Injectable()
export class QuotationsGenerateService {
  constructor(
    @InjectRepository(SysMasterUnits, CRM)
    private readonly unitsRepository: Repository<SysMasterUnits>,
    @InjectRepository(SysREMProjectModel, CRM)
    private readonly modelsRepository: Repository<SysREMProjectModel>,
    @InjectRepository(Quotation)
    private readonly quotationsRepository: Repository<Quotation>,
    @InjectRepository(File)
    private readonly filesRepository: Repository<File>,

    private readonly uploadService: UploadService,
    private readonly configService: ConfigService,
  ) {}

  async findOne(id: string): Promise<Quotation> {
    return this.quotationsRepository.findOne({
      where: { id },
      relations: {
        promotions: true,
        items: {
          product: true,
          variant: { images: true },
          package: true,
          items: { variant: { images: true } },
        },
      },
    });
  }

  async generatePDF(quotation: Quotation): Promise<Buffer> {
    const [unit, model] = await Promise.all([
      this.getUnitWithProject(quotation.unitId),
      this.getModel(quotation.unitId),
    ]);

    const signatureFile = await this.getSignatureFile(quotation.id);
    const dataSource = this.buildDataSource(quotation.items ?? []);
    const images = await this.fetchProductImages(dataSource);
    const tableData = this.buildTableData(dataSource, images);
    const pricing = this.calculatePricing(
      dataSource,
      quotation.promotions ?? [],
    );

    return this.createPDFDocument(
      quotation,
      unit,
      model,
      tableData,
      images,
      pricing,
      signatureFile,
    );
  }

  // Data fetching methods
  private async getUnitWithProject(unitId: string) {
    return this.unitsRepository.findOne({
      where: { id: unitId },
      relations: { project: true },
    });
  }

  private async getModel(unitId: string) {
    const unit = await this.getUnitWithProject(unitId);
    if (!unit?.project?.id || !unit?.modelId) return null;

    return this.modelsRepository.findOne({
      where: { projectId: unit.project.id, id: unit.modelId },
    });
  }

  // Data transformation methods
  private buildDataSource(items: any[]): DataSourceItem[] {
    const dataSource: DataSourceItem[] = [];
    let orderIndex = 1;

    items.forEach((item) => {
      if (item.productType === ProductItemType.PACKAGE) {
        dataSource.push({
          id: item.id,
          orderIndex: orderIndex++,
          isPackageItem: false,
          data: item,
        });

        item.items?.forEach((packageItem) => {
          dataSource.push({
            id: packageItem.packageItemId ?? '',
            isPackageItem: true,
            data: packageItem,
          });
        });
      } else {
        dataSource.push({
          id: item.id,
          orderIndex: orderIndex++,
          isPackageItem: false,
          data: item,
        });
      }
    });

    return dataSource;
  }

  private async fetchProductImages(
    dataSource: DataSourceItem[],
  ): Promise<ImageData[]> {
    const imagePromises = dataSource.map(async (item) => {
      const mainImage = item.data?.variant?.images.find((img) => img.isMain);
      if (!mainImage) return null;

      try {
        const response = await axios.get(
          `${this.configService.getOrThrow<string>('AWS_CLOUDFRONT_URL')}/${mainImage.filePath}`,
          { responseType: 'arraybuffer' },
        );

        const resizedBuffer = await sharp(response.data)
          .resize({
            fit: 'cover',
            withoutEnlargement: true,
          })
          .toBuffer();

        const extension = mainImage.filePath.split('.').pop();
        const base64 = `data:image/${extension};base64,${resizedBuffer.toString('base64')}`;

        return { id: mainImage.id, base64 };
      } catch (error) {
        console.error(`Failed to fetch image for item ${item.id}:`, error);
        return null;
      }
    });

    const results = await Promise.all(imagePromises);
    return results.filter((img): img is ImageData => img !== null);
  }

  private buildTableData(
    dataSource: DataSourceItem[],
    images: ImageData[],
  ): TableData[] {
    return dataSource.map((item) => {
      const quantity = item.data?.quantity ?? 1;
      const price = item.data?.specialPrice ?? item.data?.price ?? 0;
      const totalPrice = price * quantity;
      const mainImage = item.data?.variant?.images.find((img) => img.isMain);

      return {
        item: item.orderIndex ? `${item.orderIndex}` : '',
        description: item.isPackageItem
          ? `• ${item.data?.productName}`
          : item.data?.productName,
        size: '',
        quantity: `${quantity}`,
        price: this.formatPrice(price),
        totalPrice: this.formatPrice(totalPrice),
        image: mainImage?.id,
      };
    });
  }

  private calculatePricing(dataSource: DataSourceItem[], promotions: any[]) {
    const totalPrice = sumBy(dataSource, (item) => {
      const price = item.data?.specialPrice ?? item.data?.price ?? 0;
      const quantity = item.data?.quantity ?? 1;
      return price * quantity;
    });

    const promotionsPrice = sumBy(promotions, (promo) => Number(promo.value));

    return {
      totalPrice,
      promotionsPrice,
      totalPriceWithPromotions: totalPrice - promotionsPrice,
    };
  }

  private async getSignatureFile(quotationId: string) {
    const file = await this.filesRepository.findOne({
      where: { refId: quotationId, attachmentType: AttachmentType.SIGNATURE },
    });

    if (!file) return null;

    const buffer = await this.uploadService.getFile(
      file.fileBucket,
      file.filePath,
    );

    const image = await sharp(buffer)
      .resize({
        fit: 'cover',
        position: 'center',
        withoutEnlargement: true,
      })
      .toBuffer();

    return image;
  }

  // PDF creation methods
  private async createPDFDocument(
    quotation: Quotation,
    unit: any,
    model: any,
    tableData: TableData[],
    images: ImageData[],
    pricing: {
      totalPrice: number;
      promotionsPrice: number;
      totalPriceWithPromotions: number;
    },
    signatureFile: Buffer,
  ): Promise<Buffer> {
    return new Promise((resolve) => {
      const doc = new PDFDocument({
        size: PDF_CONFIG.SIZE,
        bufferPages: true,
        info: {
          Title: quotation?.code,
          CreationDate: dayjs(quotation.date).toDate(),
        },
        layout: PDF_CONFIG.LAYOUT,
        margins: PDF_CONFIG.MARGINS,
        autoFirstPage: true,
      });

      this.registerFonts(doc);

      const logoBuffer = fs.readFileSync(ASSETS.LOGO);
      this.renderHeader(doc, logoBuffer, quotation, unit, model);

      doc.moveDown(2);

      this.renderProductTable(doc, tableData, images);
      this.renderPricingTable(doc, pricing);

      doc.moveDown(1.5);
      this.renderAccountInfo(doc);

      doc.moveDown(1.5);
      this.renderPaymentTerms(doc);

      doc.moveDown(1.5);
      this.renderDecorationTerms(doc);

      doc.moveDown(2);
      this.renderSignature(doc, signatureFile);

      doc.end();

      const buffer = [];
      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => resolve(Buffer.concat(buffer)));
    });
  }

  private registerFonts(doc: PDFDocument): void {
    Object.entries(FONTS).forEach(([key, fontName]) => {
      doc.registerFont(fontName, FONT_PATHS[key]);
    });
  }

  private renderHeader(
    doc: PDFDocument,
    logoBuffer: Buffer,
    quotation: Quotation,
    unit: any,
    model: any,
  ): void {
    doc.image(logoBuffer, doc.page.margins.left + 25, doc.page.margins.top, {
      fit: [PDF_CONFIG.IMAGE_SIZE.width, PDF_CONFIG.IMAGE_SIZE.width],
    });

    doc
      .fontSize(6)
      .font(FONTS.REGULAR)
      .text(
        COMPANY_INFO.LOCATION,
        doc.page.margins.left + 105,
        doc.page.margins.top + PDF_CONFIG.IMAGE_SIZE.width / 6,
      );

    doc.moveDown(1);

    doc
      .font(FONTS.SEMI_BOLD)
      .fontSize(16)
      .text(
        'ใบเสนอราคา (Quotation)',
        doc.page.margins.left,
        doc.page.margins.top + 35,
        { align: 'center' },
      );

    doc.moveDown(1);

    const headerData = [
      {
        left: {
          label: 'Attn: ',
          value: `${quotation.firstName} ${quotation.lastName}`,
        },
        right: { label: 'E-mail: ', value: quotation.email },
      },
      {
        left: { label: 'Room: ', value: unit?.unitNumber },
        right: { label: 'Number: ', value: quotation.code },
      },
      {
        left: { label: 'Type: ', value: model?.id },
        right: { label: 'Project: ', value: unit?.project?.nameTh },
      },
      {
        left: {
          label: 'Mobile: ',
          value: this.formatPhoneNumber(quotation.telephone),
        },
        right: {
          label: 'Date: ',
          value: dayjs(quotation.date).format('DD MMMM YYYY'),
        },
      },
    ];

    const x = doc.x;
    headerData.forEach((row) => {
      this.renderHeaderRow(doc, x, row.left, row.right);
    });

    doc.moveDown(0.25);
  }

  private renderHeaderRow(
    doc: PDFDocument,
    x: number,
    left: { label: string; value: string },
    right: { label: string; value: string },
  ): void {
    const y = doc.y;
    const tableWidth = doc.page.width - doc.page.margins.left * 2;
    const colWidth = (tableWidth - 10) / 4;
    const textIndent = 75;

    doc
      .font(FONTS.SEMI_BOLD)
      .fontSize(8)
      .text(left.label, x, y)
      .font(FONTS.REGULAR)
      .fontSize(8)
      .text(left.value, x + colWidth - textIndent, y);

    doc
      .font(FONTS.SEMI_BOLD)
      .fontSize(8)
      .text(right.label, colWidth * 2, y)
      .font(FONTS.REGULAR)
      .fontSize(8)
      .text(right.value, colWidth * 3 - textIndent, y);
  }

  private renderProductTable(
    doc: PDFDocument,
    data: TableData[],
    images: ImageData[],
  ): void {
    const imageRenderer = (
      value,
      indexColumn,
      indexRow,
      row,
      rectRow,
      rectCell,
    ) => {
      const image = images.find((img) => img?.id === value);
      if (!image) return '';

      const { x, y, width, height } = rectCell;
      const padding = 5;
      const imageSize = Math.min(width - padding * 2, height - padding * 2, 40);
      const imageX = x + (width - imageSize) / 2;
      const imageY = y + (height - imageSize) / 2;

      doc.image(image.base64, imageX, imageY, {
        width: imageSize,
        height: imageSize,
        fit: [imageSize, imageSize],
        align: 'center',
        valign: 'center',
      });

      return '';
    };

    doc.table(
      {
        headers: [
          {
            label: 'ลำดับที่',
            property: 'item',
            headerAlign: 'center',
            headerColor: 'white',
            align: 'center',
            width: 50,
            valign: 'middle',
          },
          {
            label: 'รายการ',
            property: 'description',
            headerAlign: 'left',
            headerColor: 'white',
            align: 'left',
            width: 150,
            valign: 'middle',
          },
          {
            label: 'ขนาด',
            property: 'size',
            headerColor: 'white',
            align: 'center',
            width: 50,
            valign: 'middle',
          },
          {
            label: 'รูปภาพ',
            property: 'image',
            headerColor: 'white',
            align: 'center',
            width: 120,
            renderer: imageRenderer,
            valign: 'middle',
          },
          {
            label: 'ราคา/หน่วย',
            property: 'price',
            headerColor: 'white',
            align: 'right',
            width: 65,
            valign: 'middle',
          },
          {
            label: 'จำนวน',
            property: 'quantity',
            headerColor: 'white',
            align: 'center',
            width: 55,
            valign: 'middle',
          },
          {
            label: 'ราคารวม',
            property: 'totalPrice',
            headerColor: 'white',
            align: 'right',
            valign: 'middle',
            width: 65,
          },
        ],
        datas: data.map((item) => ({
          item: item.item,
          description: item.description,
          size: item.size,
          quantity: item.quantity,
          price: item.price,
          totalPrice: item.totalPrice,
          image: item.image,
        })),
      },
      {
        width: doc.page.width - doc.page.margins.left * 2,
        x: doc.page.margins.left,
        y: doc.y,
        prepareHeader: () => doc.font(FONTS.BOLD).fontSize(8),
        prepareRow: () => doc.font(FONTS.REGULAR).fontSize(8),
        minRowHeight: PDF_CONFIG.MIN_ROW_HEIGHT,
        columnSpacing: 0,
        padding: [0, 10, 0, 0],
      },
    );
  }

  private renderPricingTable(doc: PDFDocument, pricing: any): void {
    doc.table(
      {
        headers: [
          {
            label: 'รายการ',
            property: 'description',
            headerColor: 'white',
            align: 'right',
          },
          {
            label: 'ราคารวม',
            property: 'totalPrice',
            headerColor: 'white',
            align: 'right',
          },
        ],
        rows: [
          [
            'มูลค่ารวมทั้งสิ้น (รวมภาษีมูลค่าเพิ่ม)',
            this.formatPrice(pricing.totalPrice),
          ],
          ['ส่วนลด', this.formatPrice(pricing.promotionsPrice)],
          [
            'มูลค่ารวมทั้งสิ้น (รวมภาษีมูลค่าเพิ่ม)',
            this.formatPrice(pricing.totalPriceWithPromotions),
          ],
        ],
      },
      {
        columnsSize: [425, 130],
        hideHeader: true,
        width: doc.page.width - doc.page.margins.left * 2,
        x: doc.page.margins.left,
        y: doc.y - 12,
        minRowHeight: 16,
        columnSpacing: 0,
        padding: [0, 10, 0, 0],
        divider: { horizontal: { disabled: true } },
        prepareHeader: () => doc.font(FONTS.REGULAR).fontSize(8),
        prepareRow: (row, indexColumn, indexRow, rectRow) => {
          if (indexColumn === 0) {
            const color = indexRow % 2 ? '#FFFFFF' : '#F0F0F0';
            doc
              .rect(rectRow.x, rectRow.y, rectRow.width, rectRow.height)
              .fill(color);
          }
          return indexRow === 2
            ? doc.font(FONTS.BOLD).fontSize(8).fillColor('#000000')
            : doc.font(FONTS.REGULAR).fontSize(8).fillColor('#000000');
        },
      },
    );
  }

  private renderAccountInfo(doc: PDFDocument): void {
    this.checkAddPage(doc, 25);
    const y = doc.y;
    const x = doc.page.margins.left + 25;
    const containerWidth = 555;
    const containerHeight = 25;
    const containerX = doc.page.margins.left;
    const containerY = y - 7.5;

    doc.rect(containerX, containerY, containerWidth, containerHeight).stroke();

    const bankLogo = fs.readFileSync(ASSETS.BANK_LOGO);
    doc
      .fontSize(8)
      .font(FONTS.BOLD)
      .text('Account: ', x, y - 1)
      .image(bankLogo, x + 45, y - 1, {
        width: 10,
        height: 10,
        fit: [10, 10],
      })
      .font(FONTS.REGULAR)
      .text(COMPANY_INFO.ACCOUNT_BANK, x + 60, y - 1);

    const dividerX = containerX + 270;
    doc
      .moveTo(dividerX, containerY)
      .lineTo(dividerX, containerY + containerHeight)
      .stroke();

    const accountNumberX = containerX + 300;
    doc
      .font(FONTS.BOLD)
      .text('Account Number: ', accountNumberX, y - 1)
      .font(FONTS.REGULAR)
      .text(COMPANY_INFO.ACCOUNT_NUMBER, accountNumberX + 80, y - 1);
  }

  private renderPaymentTerms(doc: PDFDocument): void {
    const containerX = doc.page.margins.left;
    const containerY = doc.y;
    const containerWidth = 555;
    const containerHeight = 65;
    const padding = { x: 20, y: 8 };

    doc
      .rect(containerX, containerY, containerWidth, containerHeight)
      .fill('#F0F0F0');
    doc.fill('#000000');

    doc
      .font(FONTS.SEMI_BOLD)
      .fontSize(8)
      .text(
        'เงื่อนไขการชำระเงิน',
        containerX + padding.x,
        containerY + padding.y,
      );

    const paymentItems = [
      { label: 'มัดจำ', amount: 10000 },
      { label: 'ชำระก่อนตกแต่ง', amount: 10000 },
      { label: 'ชำระเมื่อตกแต่งเสร็จ', amount: 10000 },
    ];

    let currentY = containerY + padding.y + 16;

    paymentItems.forEach((item, index) => {
      const itemY = currentY + index * 12;
      doc
        .font(FONTS.REGULAR)
        .fontSize(8)
        .text(item.label, containerX + padding.x, itemY);

      const amountText = this.formatNumberWithCommas(item.amount);
      const bathText = 'บาท';
      const rightX = containerX + containerWidth - padding.x;
      const bathWidth = doc.widthOfString(bathText);
      const amountWidth = doc.widthOfString(amountText);

      doc.text(bathText, rightX - bathWidth, itemY);
      doc.text(amountText, rightX - bathWidth - 8 - amountWidth, itemY);
    });

    doc.y = containerY + containerHeight;
  }

  private renderDecorationTerms(doc: PDFDocument): void {
    const terms = [
      '1. ราคาดังกล่าวรวมภาษีมูลค่าเพิ่มแล้ว กำหนดยืนราคา 10 วัน นับจากวันที่เสนอในใบเสนอราคา',
      '2. เมื่อชำระมัดจำจองสิทธิ์ สิทธิ์จะมีอายุการใช้งาน 1 ปี นับจากวันที่ชำระมัดจำ หากเกินระยะเวลาที่กำหนดถือว่าสิทธ์เป็นโมฆะ และเมื่อมัดจำสินค้าหรือชำระเงินใดๆกับทางบริษัทฯ และรับเงื่อนไขของบริษัทฯ เป็นที่เรียบร้อยแล้วทางบริษัทฯ ขอสงวนสิทธิ์ในการคืนเงินทุกกรณี',
      '3. ลูกค้าจะต้องรับมอบพื้นที่จากทางโครงการล่วงหน้า 10 วัน ก่อนบริษัทฯ เข้าดำเนินการตกแต่ง',
      '4. บริษัทฯ ไม่รับผิดชอบในการจัดการเรื่องประปา, stopvalveชุดครัว งานระบบไฟฟ้า งานปูกระเบื้อง และ ค่าไฟฟ้า, ค่าน้ำประปา ในระหว่างการตกแต่ง',
      '5. ระยะเวลาติดตั้ง 30-60 วันทำการ นับจากวันที่กำหนดเริ่มงาน ไม่รวมเสาร์อาทิตย์ วันหยุดนักขัตฤกษ์ ระยะเวลาทำงานไม่รวมกับระยะเวลาการแก้ไขดีเฟคงาน ซึ่งทางบริษัทฯ มีระยะเวลาให้ลูกค้าตรวจสอบเพื่อแก้ไขดีเฟคงานอีก 30 วัน นับจากวันที่ทางบริษัทได้ดำเนินการตกแต่งแล้วเสร็จ และลูกค้าได้ตรวจงานร่วมกันกับทางบริษัทฯ แล้ว บริษัทไม่รับผิดชอบในการส่งมอบล่าช้า อันเนื่องมาจากเหตุสุดวิสัย (หากมีการเปลี่ยนแปลงระยะเวลาทำงาน จะแจ้งให้ทราบอีกครั้ง)',
      '6. เมื่อมีการตรวจรับมอบงานและแก้ไขดีเฟคงานตามเงื่อนไขข้างต้นแล้ว บริษัทฯ จะออกใบแจ้งหนี้เพื่อขอรับชำระ ภายใน 30 วัน หากไม่ชำระตามระยะเวลาที่กำหนด บริษัทฯ ขออนุญาตดำเนินการทางกฏหมาย',
      '7. เงื่อนไขการรับประกันสินค้ามีระยะเวลาการรับประกัน 12 เดือน สำหรับโครงสร้างภายใน และ 6 เดือนสำหรับส่วนประกอบภายนอก , ผ้าม่าน , วอลล์เปเปอร์ , เฟอร์นิเจอร์ นับตั้งแตวันที่ผู้ว่าจ้างรับมอบงาน โดยบริษัทฯ จะรับประกันความเสียหายที่เกิดจากความผิดพลาดในตัวสินค้าเท่านั้น (บริษัทฯ จะละเว้นการรับประกัน กรณีสินค้าชำรุดเสียหายอันเกิดจากการใช้งานไม่ถูกวิธีโดยผู้ว่าจ้าง  หรือเกิดจากความ ประมาทเลินเล่อของผู้ว่าจ้าง หรือผู้ว่าจ้างมีเจตนาทำให้สินค้าเสียหาย) บริษัทฯ ขอสงวนสิทธิ์ในการเป็นผู้ตรวจสอบและวินิจฉัยว่าสินค้ายังอยูในการรับประกันหรือไม่  โดยคำตัดสินของบริษัทถือว่าเป็นที่ สิ้นสุด บริษัทฯ ยินดีให้การรับประกันและบริการซ่อมแซมแก้ไข การชำรุดบกพร่องที่เกิดจากการก่อสร้างหรือทำงานจากบริษัทฯ',
      '8. ในกรณีที่ลูกค้ามีการสั่งซื้อสินค้าเพิ่มเติมจากใบเสนอราคาข้างต้นนี้ บริษัทฯ จะทำใบเสนอราคาฉบับเพิ่มเติม และใช้เงื่อนไขระยะเวลาการติดตั้งงานแยกตามใบเสนอราคางานของเพิ่มเติมนั้น',
      '9. เมื่อลูกค้ายืนยันรายการสินค้าและราคาข้างต้นนี้แล้ว บริษัทฯ ขอสงวนสิทธิ์ในการยกเลิกรายการสินค้าหรือสินค้าบางรายการ และ ขอสงวนสิทธิ์ในการให้ส่วนลดเพิ่มเติม ทุกกรณี',
    ];

    doc
      .fill('#000000')
      .font(FONTS.REGULAR)
      .fontSize(8)
      .text('เงื่อนไขการตกแต่ง', doc.page.margins.left, doc.y)
      .moveDown(0.5);

    terms.forEach((term) => {
      this.checkAddPage(doc, 8);
      const processedText = this.prepareThaiText(term);
      doc
        .font(FONTS.REGULAR)
        .fontSize(8)
        .text(processedText, doc.page.margins.left, doc.y)
        .moveDown(0.25);
    });
  }

  private renderSignature(doc: PDFDocument, signatureFile: Buffer): void {
    const startY = doc.y;
    const leftMargin = doc.page.margins.left;
    const tableWidth = doc.page.width - doc.page.margins.left * 2;
    const colWidth = (tableWidth - 10) / 4;
    const textIndent = 10;
    const signatureHeight = 60;
    const signatureDateHeight = 25;

    const timelineRows = [
      {
        label: 'รับชำระก่อนเริ่มงาน วันที่ :',
        value: '10/11/2568',
        height: 25,
      },
      {
        label: 'ผู้ว่าจ้างรับมอบห้องจากโครงการ วันที่ :',
        value: '10/11/2568',
        height: 25,
      },
      {
        label: 'บริษัทฯ ประเมินระยะเวลาตกแต่ง :',
        value: '23 วัน',
        label2: 'คาดการณ์เริ่มตกแต่งวันที่ :',
        value2: '20/11/2568',
        height: 25,
        isSplit: true,
      },
    ];

    let currentY = startY;

    timelineRows.forEach((row) => {
      const textY = currentY + (row.height - 12) / 2;

      if (row.isSplit) {
        doc
          .rect(leftMargin, currentY, colWidth + textIndent, row.height)
          .stroke()
          .rect(
            leftMargin + colWidth + textIndent,
            currentY,
            colWidth - textIndent,
            row.height,
          )
          .stroke();

        doc
          .font(FONTS.SEMI_BOLD)
          .fontSize(8)
          .text(row.label, leftMargin + textIndent, textY);

        doc
          .font(FONTS.REGULAR)
          .fontSize(8)
          .text(row.value, leftMargin + colWidth - textIndent, textY, {
            align: 'right',
            width: colWidth,
          });

        doc
          .rect(
            leftMargin + colWidth * 2,
            currentY,
            colWidth + textIndent,
            row.height,
          )
          .stroke()
          .rect(
            leftMargin + textIndent + colWidth * 3,
            currentY,
            colWidth - textIndent,
            row.height,
          )
          .stroke();

        doc
          .font(FONTS.SEMI_BOLD)
          .fontSize(8)
          .text(row.label2, leftMargin + textIndent + colWidth * 2, textY);

        doc
          .font(FONTS.REGULAR)
          .fontSize(8)
          .text(row.value2, leftMargin + colWidth * 3 - textIndent, textY, {
            align: 'right',
            width: colWidth,
          });
      } else {
        doc
          .rect(leftMargin, currentY, colWidth + textIndent, row.height)
          .stroke()
          .rect(
            leftMargin + colWidth + textIndent,
            currentY,
            colWidth - textIndent,
            row.height,
          )
          .stroke();

        doc
          .font(FONTS.SEMI_BOLD)
          .fontSize(8)
          .text(row.label, leftMargin + textIndent, textY);

        doc
          .font(FONTS.REGULAR)
          .fontSize(8)
          .text(row.value, leftMargin + colWidth - textIndent, textY, {
            align: 'right',
            width: colWidth,
          });
      }

      currentY += row.height;
    });

    doc
      .rect(leftMargin, currentY, colWidth * 2, signatureHeight)
      .stroke()
      .rect(leftMargin + colWidth * 2, currentY, colWidth * 2, signatureHeight)
      .stroke();

    const sigLabelY = currentY + (signatureHeight - 12) / 2;

    doc
      .font(FONTS.SEMI_BOLD)
      .fontSize(8)
      .text('ผู้เสนอราคา:', leftMargin + textIndent, sigLabelY);

    doc
      .font(FONTS.REGULAR)
      .fontSize(8)
      .text('วิกาณธิดา', leftMargin - textIndent, sigLabelY, {
        width: colWidth * 2,
        align: 'right',
      });

    doc
      .font(FONTS.SEMI_BOLD)
      .fontSize(8)
      .text('ผู้ว่าจ้าง:', leftMargin + colWidth * 2 + textIndent, sigLabelY);

    if (signatureFile) {
      const signatureX = leftMargin + colWidth * 4 - 100;
      const signatureY = currentY + (signatureHeight - 100) / 2;
      doc.image(signatureFile, signatureX, signatureY, {
        width: 100,
        height: 100,
        fit: [100, 100],
        align: 'center',
        valign: 'center',
      });
    }

    currentY += signatureHeight;

    doc
      .rect(leftMargin, currentY, colWidth * 2, signatureDateHeight)
      .stroke()
      .rect(
        leftMargin + colWidth * 2,
        currentY,
        colWidth * 2,
        signatureDateHeight,
      )
      .stroke();

    const dateTextY = currentY + (signatureDateHeight - 14) / 2;
    doc
      .font(FONTS.SEMI_BOLD)
      .fontSize(8)
      .text('วันที่:', leftMargin + textIndent, dateTextY);

    doc
      .font(FONTS.REGULAR)
      .fontSize(8)
      .text('09/10/2568', leftMargin - textIndent, dateTextY, {
        width: colWidth * 2,
        align: 'right',
      });

    doc
      .font(FONTS.SEMI_BOLD)
      .fontSize(8)
      .text('วันที่:', leftMargin + colWidth * 2 + textIndent, dateTextY);

    doc
      .font(FONTS.REGULAR)
      .fontSize(8)
      .text('09/10/2568', leftMargin + colWidth * 2 - textIndent, dateTextY, {
        width: colWidth * 2,
        align: 'right',
      });

    currentY += signatureDateHeight;
    doc.y = currentY;
  }

  addWatermark(doc: PDFDocument): void {
    doc
      .fontSize(8)
      .fillColor('gray')
      .opacity(0.15)
      .rotate(-45, { origin: [300, 400] })
      .text('CONFIDENTIAL', 100, 300, {
        align: 'center',
        width: 400,
      })
      .rotate(45, { origin: [300, 400] })
      .opacity(1)
      .fillColor('black');
  }

  private formatPhoneNumber(phoneNumber: string): string {
    if (!phoneNumber) return '-';

    if (phoneNumber.length === 9) {
      return phoneNumber.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
    }
    if (phoneNumber.length === 10) {
      return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    }

    return phoneNumber;
  }

  private prepareThaiText(text: string): string {
    const cutText = wordcut.cut(text);
    const words = cutText.split('|').filter((word) => word.length > 0);
    return words.join('\u200B');
  }

  private formatNumberWithCommas(num: number): string {
    return num.toLocaleString('en-US');
  }

  private formatPrice(price: number): string {
    return `${numeral(price).format('0,0[.]00')}.-`;
  }

  private checkAddPage(doc: PDFDocument, addHeight: number) {
    const bottomMargin = doc.page.margins.bottom ?? 50;
    const pageHeight = doc.page.height - bottomMargin;

    if (doc.y + addHeight > pageHeight) {
      doc.addPage();
      doc.y = doc.page.margins.top; // reset y
    }
  }
}
