import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import {
  PromotionKind,
  PromotionType,
} from '../../shared/enums/promotion.enum';
import { Promotion } from '../entities/promotion.entity';

export const mockPromotions = [
  // ========== VOUCHERS ==========
  {
    kind: PromotionKind.VOUCHER,
    code: 'WY001',
    name: 'Vocher Wyde ลด 100 บาท',
    description: 'ส่วนลดพิเศษสำหรับลูกค้าใหม่',
    type: PromotionType.FIXED_AMOUNT,
    value: 100.0,

    startAt: new Date('2025-01-01'),
    endAt: new Date('2025-12-31'),
    isActive: true,
    usageLimit: 1000,
    usedCount: 245,
    perUserLimit: 1,
    minOrderTotal: 500.0,
    maxDiscountAmount: null,
  },
  {
    kind: PromotionKind.VOUCHER,
    code: 'WY002',
    name: 'Vocher Wyde ลด 15%',
    description: 'ส่วนลด 15% สูงสุด 300 บาท',
    type: PromotionType.PERCENTAGE,
    value: 15.0,
    startAt: new Date('2025-02-01'),
    endAt: new Date('2025-03-31'),
    isActive: true,
    usageLimit: 500,
    usedCount: 89,
    perUserLimit: 2,
    minOrderTotal: 1000.0,
    maxDiscountAmount: 300.0,
  },
  {
    kind: PromotionKind.VOUCHER,
    code: 'WY003',
    name: 'Vocher Wyde Free Shipping',
    description: 'ส่งฟรีไม่มีขั้นต่ำ',
    type: PromotionType.FIXED_AMOUNT,
    value: 50.0,
    startAt: new Date('2025-01-15'),
    endAt: new Date('2025-06-30'),
    isActive: true,
    usageLimit: 2000,
    usedCount: 1456,
    perUserLimit: 5,
    minOrderTotal: null,
    maxDiscountAmount: null,
  },
  {
    kind: PromotionKind.VOUCHER,
    code: 'NEWUSER50',
    name: 'สมาชิกใหม่ลด 50',
    description: 'สำหรับสมาชิกใหม่เท่านั้น',
    type: PromotionType.FIXED_AMOUNT,
    value: 50.0,
    startAt: new Date('2025-01-01'),
    endAt: null, // ไม่มีวันหมดอายุ
    isActive: true,
    usageLimit: null, // ไม่จำกัดจำนวนครั้งรวม
    usedCount: 3421,
    perUserLimit: 1,
    minOrderTotal: 200.0,
    maxDiscountAmount: null,
  },

  // ========== DISCOUNTS ==========
  {
    kind: PromotionKind.DISCOUNT,
    code: 'Discount100',
    name: 'ส่วนลดสินค้าราคาพิเศษ',
    description: 'ลดทันที 100 บาท สำหรับสินค้าที่ร่วมรายการ',
    type: PromotionType.FIXED_AMOUNT,
    value: 100.0,
    startAt: new Date('2025-03-01'),
    endAt: new Date('2025-03-31'),
    isActive: true,
    usageLimit: null, // ไม่จำกัด
    usedCount: 567,
    perUserLimit: null,
    minOrderTotal: null,
    maxDiscountAmount: null,
  },
  {
    kind: PromotionKind.DISCOUNT,
    code: 'SALE20',
    name: 'ลด 20% ทุกชิ้น',
    description: 'Sale ลด 20% ทุกสินค้าในหมวดหมู่แฟชั่น',
    type: PromotionType.PERCENTAGE,
    value: 20.0,
    startAt: new Date('2025-04-01'),
    endAt: new Date('2025-04-30'),
    isActive: true,
    usageLimit: 5000,
    usedCount: 2341,
    perUserLimit: null,
    minOrderTotal: 300.0,
    maxDiscountAmount: 500.0,
  },
  {
    kind: PromotionKind.DISCOUNT,
    code: 'FLASH50',
    name: 'Flash Sale ลด 50%',
    description: 'Flash Sale 24 ชม. ลด 50% สูงสุด 1,000 บาท',
    type: PromotionType.PERCENTAGE,
    value: 50.0,
    startAt: new Date('2025-05-01T00:00:00'),
    endAt: new Date('2025-05-01T23:59:59'),
    isActive: false, // หมดเวลาแล้ว
    usageLimit: 100,
    usedCount: 100, // ใช้หมดแล้ว
    perUserLimit: null,
    minOrderTotal: 2000.0,
    maxDiscountAmount: 1000.0,
  },
  {
    kind: PromotionKind.DISCOUNT,
    code: 'BUNDLE10',
    name: 'ซื้อครบ 3 ชิ้น ลด 10%',
    description: 'ซื้อสินค้าครบ 3 ชิ้นขึ้นไป ลด 10%',
    type: PromotionType.PERCENTAGE,
    value: 10.0,
    startAt: new Date('2025-01-01'),
    endAt: new Date('2025-12-31'),
    isActive: true,
    usageLimit: null,
    usedCount: 8934,
    perUserLimit: null,
    minOrderTotal: 1500.0,
    maxDiscountAmount: 200.0,
  },
  {
    kind: PromotionKind.DISCOUNT,
    code: 'WEEKEND30',
    name: 'Weekend Sale ลด 30%',
    description: 'ส่วนลดพิเศษทุกสุดสัปดาห์',
    type: PromotionType.PERCENTAGE,
    value: 30.0,
    startAt: new Date('2025-06-07'),
    endAt: new Date('2025-06-08'),
    isActive: true,
    usageLimit: 1000,
    usedCount: 234,
    perUserLimit: null,
    minOrderTotal: 500.0,
    maxDiscountAmount: 400.0,
  },
  {
    kind: PromotionKind.DISCOUNT,
    code: 'CLEARANCE70',
    name: 'Clearance Sale ลด 70%',
    description: 'ลดราคาสินค้าคงเหลือสูงสุด 70%',
    type: PromotionType.PERCENTAGE,
    value: 70.0,
    startAt: new Date('2025-07-01'),
    endAt: new Date('2025-07-31'),
    isActive: true,
    usageLimit: null,
    usedCount: 0, // ยังไม่เริ่ม
    perUserLimit: null,
    minOrderTotal: null,
    maxDiscountAmount: null,
  },
];

export default class PromotionSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    console.log(`-------- Start PromotionSeeder --------`);

    const userId = '800efe5e-ac25-4608-ac88-4f967d9fcbba';

    await dataSource.getRepository(Promotion).save(
      mockPromotions.map((promotion) => ({
        ...promotion,
        createdBy: userId,
        updatedBy: userId,
      })),
    );

    console.log(`-------- End PromotionSeeder --------\n`);
  }
}
