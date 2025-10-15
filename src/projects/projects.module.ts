import { CRM } from '@/config/data-source.service';
import { SysMasterProjects } from '@/database/crm/SysMasterProjects.entity';
import { SysMasterUnits } from '@/database/crm/SysMasterUnits.entity';
import { SysREMFloor } from '@/database/crm/SysREMFloor.entity';
import { SysREMTower } from '@/database/crm/SysREMTower.entity';
import { VwCSv2 } from '@/database/crm/VwCSv2.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FloorsLoader } from './floors.loader';
import { FloorsResolver } from './floors.resolver';
import { FloorsService } from './floors.service';
import { ProjectLoader } from './projects.loader';
import { ProjectsResolver } from './projects.resolver';
import { ProjectsService } from './projects.service';
import { TowersLoader } from './towers.loader';
import { TowersResolver } from './towers.resolver';
import { TowersService } from './towers.service';
import { UnitLoader, UnitsLoader } from './units.loader';
import { UnitsResolver } from './units.resolver';
import { UnitsService } from './units.service';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [SysMasterProjects, SysMasterUnits, VwCSv2, SysREMTower, SysREMFloor],
      CRM,
    ),
  ],
  providers: [
    ProjectsResolver,
    ProjectsService,
    ProjectLoader,
    UnitsResolver,
    UnitsService,
    UnitsLoader,
    UnitLoader,
    TowersLoader,
    TowersResolver,
    TowersService,
    FloorsLoader,
    FloorsResolver,
    FloorsService,
  ],
  exports: [ProjectsService, UnitsService, TowersService, FloorsService],
})
export class ProjectsModule {}
