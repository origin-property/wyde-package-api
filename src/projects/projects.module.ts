import { CRM } from '@/config/data-source.service';
import { SysMasterProjects } from '@/database/crm/SysMasterProjects.entity';
import { SysMasterUnits } from '@/database/crm/SysMasterUnits.entity';
import { SysREMFloor } from '@/database/crm/SysREMFloor.entity';
import { SysREMMasterModelType } from '@/database/crm/SysREMMasterModelType.entity';
import { SysREMProjectModel } from '@/database/crm/SysREMProjectModel.entity';
import { SysREMTower } from '@/database/crm/SysREMTower.entity';
import { VwCSv2 } from '@/database/crm/VwCSv2.entity';
import { File } from '@/database/entities/file.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FloorsLoader } from './floors.loader';
import { FloorsResolver } from './floors.resolver';
import { FloorsService } from './floors.service';
import { ModelTypeLoader } from './model-types.loader';
import { ModelTypesService } from './model-types.serice';
import { ModelFileUrlLoader, ModelLoader } from './models.loader';
import { ModelsResolver } from './models.resolver';
import { ModelsService } from './models.service';
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
      [
        SysMasterProjects,
        SysMasterUnits,
        VwCSv2,
        SysREMTower,
        SysREMFloor,
        SysREMProjectModel,
        SysREMMasterModelType,
      ],
      CRM,
    ),
    TypeOrmModule.forFeature([File]),
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
    ModelsService,
    ModelsResolver,
    ModelLoader,
    ModelTypeLoader,
    ModelTypesService,
    ModelFileUrlLoader,
  ],
  exports: [
    ProjectsService,
    UnitsService,
    TowersService,
    FloorsService,
    ModelsService,
    ModelTypesService,
  ],
})
export class ProjectsModule {}
