import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Company } from './company.entity';
import { Position } from './position.entity';
import { PrefixTitle } from './prefix-title.entity';
import { User } from './user.entity';

@Entity('employee')
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20, unique: true })
  employeeId: string;

  @Column({ length: 50, nullable: true })
  email: string;

  @Column({ length: 50, nullable: true })
  lineId: string;

  @Column({ nullable: true })
  titleId: number;

  @Column({ length: 50, nullable: true })
  firstnameThai: string;

  @Column({ length: 50, nullable: true })
  lastnameThai: string;

  @Column({ length: 50, nullable: true })
  firstnameEng: string;

  @Column({ length: 50, nullable: true })
  lastnameEng: string;

  @Column({ type: 'date', nullable: true })
  birthdate: string;

  @Column({ length: 200, nullable: true })
  placeOfBirth: string;

  @Column({ length: 100, nullable: true })
  scar: string;

  @Column({ length: 50, nullable: true })
  nationality: string;

  @Column({ length: 50, nullable: true })
  race: string;

  @Column({ length: 50, nullable: true })
  religion: string;

  @Column({ type: 'float', nullable: true })
  height: number;

  @Column({ type: 'float', nullable: true })
  weight: number;

  @Column({ length: 1, nullable: true })
  gender: string;

  @Column({ length: 10, nullable: true })
  bloodGroup: string;

  @Column({ type: 'date', nullable: true })
  startWorkDate: string;

  @Column({ nullable: true })
  probation: boolean;

  @Column({ type: 'date', nullable: true })
  probationDate: string;

  @Column({ length: 1, nullable: true })
  probationStatus: string;

  @Column({ nullable: true })
  probationBy: string;

  @Column({ length: 13, nullable: true })
  idCardNo: string;

  @Column({ length: 100, nullable: true })
  idCardIssuedAt: string;

  @Column({ type: 'date', nullable: true })
  idCardIssuedDate: string;

  @Column({ type: 'date', nullable: true })
  idCardExpiredDate: string;

  @Column({ length: 20, nullable: true })
  taxId: string;

  @Column({ length: 100, nullable: true })
  fatherName: string;

  @Column({ length: 13, nullable: true })
  fatherIdCard: string;

  @Column({ type: 'date', nullable: true })
  fatherBirthDate: string;

  @Column({ length: 100, nullable: true })
  fatherOccupation: string;

  @Column({ length: 20, nullable: true })
  fatherStatus: string;

  @Column({ nullable: true })
  fatherAge: number;

  @Column({ length: 100, nullable: true })
  motherName: string;

  @Column({ length: 13, nullable: true })
  motherIdCard: string;

  @Column({ type: 'date', nullable: true })
  motherBirthDate: string;

  @Column({ length: 100, nullable: true })
  motherOccupation: string;

  @Column({ length: 20, nullable: true })
  motherStatus: string;

  @Column({ nullable: true })
  motherAge: number;

  @Column({ nullable: true })
  siblingTotal: number;

  @Column({ nullable: true })
  siblingMale: number;

  @Column({ nullable: true })
  siblingFemale: number;

  @Column({ nullable: true })
  siblingNo: number;

  @Column({ length: 20, nullable: true })
  marital: string;

  @Column({ length: 20, nullable: true })
  marriedType: string;

  @Column({ length: 4, nullable: true })
  marriedYear: string;

  @Column({ length: 100, nullable: true })
  spouseName: string;

  @Column({ length: 13, nullable: true })
  spouseIdCard: string;

  @Column({ length: 250, nullable: true })
  spouseAddress: string;

  @Column({ length: 100, nullable: true })
  spouseFatherName: string;

  @Column({ length: 13, nullable: true })
  spouseFatherIdCard: string;

  @Column({ type: 'date', nullable: true })
  spouseFatherBirthDate: string;

  @Column({ length: 100, nullable: true })
  spouseMotherName: string;

  @Column({ length: 13, nullable: true })
  spouseMotherIdCard: string;

  @Column({ type: 'date', nullable: true })
  spouseMotherBirthDate: string;

  @Column({ length: 100, nullable: true })
  spouseOccupation: string;

  @Column({ length: 200, nullable: true })
  spouseFirmAddress: string;

  @Column({ length: 10, nullable: true })
  spouseIncome: string;

  @Column({ nullable: true })
  childrenMale: number;

  @Column({ nullable: true })
  childrenFemale: number;

  @Column({ nullable: true })
  childrenInScholl: number;

  @Column({ nullable: true })
  childrenOver: number;

  @Column({ length: 50, nullable: true })
  nickname: string;

  @Column({ nullable: true })
  positionId: string;

  @Column({ nullable: true })
  band: number;

  @Column({ nullable: true })
  companyId: string;

  @Column({ nullable: true })
  businessUnitId: string;

  @Column({ nullable: true })
  divisionId: string;

  @Column({ nullable: true })
  departmentId: string;

  @Column({ nullable: true })
  sectionId: string;

  @Column({ nullable: true, name: 'approve1' })
  approve1Id: string;

  @Column({ nullable: true, name: 'approve2' })
  approve2Id: string;

  @Column({ nullable: true, name: 'approve3' })
  approve3Id: string;

  @Column({ nullable: true, name: 'approveKpi' })
  approveKpiId: string;

  @Column({ nullable: true, name: 'approveKpi2' })
  approveKpi2Id: string;

  @Column({ type: 'date', nullable: true })
  requestDate: string;

  @Column({ type: 'date', nullable: true })
  approveDate: string;

  @Column({ length: 50, nullable: true })
  homeTelephone: string;

  @Column({ length: 50, nullable: true })
  mobilePhone: string;

  @Column({ length: 50, nullable: true })
  workPhone: string;

  @Column({ length: 15, nullable: true })
  presentNo: string;

  @Column({ length: 100, nullable: true })
  presentBuilding: string;

  @Column({ length: 100, nullable: true })
  presentSoi: string;

  @Column({ length: 100, nullable: true })
  presentRoad: string;

  @Column({ nullable: true, name: 'presentSubDistrict' })
  presentSubDistrictId: number;

  @Column({ nullable: true, name: 'presentDistrict' })
  presentDistrictId: number;

  @Column({ nullable: true, name: 'presentProvince' })
  presentProvinceId: number;

  @Column({ length: 5, nullable: true })
  presentPostcode: string;

  @Column({ length: 15, nullable: true })
  permanentNo: string;

  @Column({ length: 100, nullable: true })
  permanentBuilding: string;

  @Column({ length: 100, nullable: true })
  permanentSoi: string;

  @Column({ length: 100, nullable: true })
  permanentRoad: string;

  @Column({ nullable: true, name: 'permanentSubDistrict' })
  permanentSubDistrictId: number;

  @Column({ nullable: true, name: 'permanentDistrict' })
  permanentDistrictId: number;

  @Column({ nullable: true, name: 'permanentProvince' })
  permanentProvinceId: number;

  @Column({ length: 5, nullable: true })
  permanentPostcode: string;

  @Column({ length: 10, nullable: true })
  workTime: string;

  @Column({ length: 10, nullable: true })
  weekends: string;

  @Column({ nullable: true })
  saturday: boolean;

  @Column({ nullable: true })
  status: number;

  @Column({ type: 'date', nullable: true })
  resignDate: string;

  @Column({ length: 2, nullable: true })
  resignReason: string;

  @Column({ length: 40, nullable: true })
  projectId1: string;

  @Column({ length: 40, nullable: true })
  projectId2: string;

  @Column({ length: 40, nullable: true })
  projectId3: string;

  @Column({ length: 40, nullable: true })
  projectId4: string;

  @Column({ length: 40, nullable: true })
  projectId5: string;

  @Column({ length: 10, nullable: true })
  employeeCardNo: string;

  @Column({ length: 100, nullable: true })
  accountNo: string;

  @Column({ length: 50, nullable: true })
  lineUuid: string;

  @Column({ length: 50, nullable: true })
  lineNotify: string;

  @Column({ length: 15, nullable: true })
  color: string;

  @Column({ nullable: true })
  acceptCAC: boolean;

  @Column({ length: 50, nullable: true })
  omiseUserId: string;

  @Column({ length: 50, nullable: true })
  omiseWalletId: string;

  @Column({ nullable: true })
  kpiId: string;

  @Column({ length: 25, nullable: true })
  militaryService: string;

  @Column({ length: 25, nullable: true })
  livingStatus: string;

  @Column({ nullable: true })
  computerSkill: string;

  @Column({ length: 20, nullable: true })
  guarantor: string;

  @Column({ length: 20, nullable: true })
  workShift: string;

  @Column({ length: 100, nullable: true })
  relativeFriend: string;

  @Column({ length: 100, nullable: true })
  relationship: string;

  @Column({ length: 5, nullable: true })
  criminalCase: string;

  @Column({ length: 200, nullable: true })
  criminalSpecify: string;

  @Column({ length: 5, nullable: true })
  contagious: string;

  @Column({ length: 200, nullable: true })
  contagiousSpecify: string;

  @Column({ nullable: true })
  homelandProvince: number;

  @Column({ length: 1, nullable: true })
  travelIntensive: string;

  @Column({ length: 1, nullable: true })
  statusBalckLis: string;

  @Column({ length: 300, nullable: true })
  detailBalckLis: string;

  @Column({ nullable: true })
  updateBalckLisBy: string;

  @Column({ length: 50, nullable: true })
  subCompany: string;

  @Column({ length: 225, nullable: true })
  resignReasonEtc: string;

  @Column({ length: 225, nullable: true })
  updateResignBy: string;

  @Column({ type: 'date', nullable: true })
  updateResignAt: string;

  @Column({ nullable: true })
  statusKpiMaster: boolean;

  @Column({ default: false })
  infraIn: boolean;

  @Column({ default: false })
  infraOut: boolean;

  @Column({ default: false })
  infraTransfer: boolean;

  @Column({ nullable: true })
  disability: string;

  @Column({ nullable: true })
  employeeType: string;

  @Column({ type: 'date', nullable: true })
  contractSDate: string;

  @Column({ type: 'date', nullable: true })
  contractEDate: string;

  @Column({ nullable: true, name: 'marriedProvince' })
  marriedProvinceId: number;

  @OneToOne(() => User, (user) => user.employee)
  @JoinColumn({ name: 'id' })
  user: Relation<User>;

  @ManyToOne(() => PrefixTitle, (prefixTitle) => prefixTitle.employees)
  @JoinColumn({ name: 'titleId' })
  title: Relation<PrefixTitle>;

  @ManyToOne(() => Position)
  @JoinColumn({ name: 'positionId' })
  position: Relation<Position>;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'approve1' })
  approve1: Relation<Employee>;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'approve2' })
  approve2: Relation<Employee>;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'approve3' })
  approve3: Relation<Employee>;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'approveKpi' })
  approveKpi: Relation<Employee>;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'approveKpi2' })
  approveKpi2: Relation<Employee>;

  @ManyToOne(() => Company, (company) => company.employees)
  @JoinColumn({ name: 'companyId' })
  company: Relation<Company>;
}
