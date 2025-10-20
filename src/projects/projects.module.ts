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
import { FloorsResolver } from './floors.resolver';
import { FloorsService } from './floors.service';
import { ModelFileLoaderFactory } from './loader/ModelFileLoader.factory';
import { ModelTypeLoaderFactory } from './loader/ModelTypeLoader.factory';
import { ProjectTowerLoaderFactory } from './loader/ProjectTowerLoader.factory';
import { ProjectUnitLoaderFactory } from './loader/ProjectUnitLoader.factory';
import { TowerFloorLoaderFactory } from './loader/TowerFloorLoader.factory';
import { UnitModelLoaderFactory } from './loader/UnitModelLoader.factory';
import { UnitProjectLoaderFactory } from './loader/UnitProjectLoader.factory';
import { ModelTypesService } from './model-types.serice';
import { ModelProjectLoaderFactory } from './ModelProjectLoader.factory';
import { ModelsResolver } from './models.resolver';
import { ModelsService } from './models.service';
import { ProjectsResolver } from './projects.resolver';
import { ProjectsService } from './projects.service';
import { TowersResolver } from './towers.resolver';
import { TowersService } from './towers.service';
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
    UnitsResolver,
    UnitsService,
    TowersResolver,
    TowersService,
    FloorsResolver,
    FloorsService,
    ModelsService,
    ModelsResolver,
    ModelTypesService,
    ProjectTowerLoaderFactory,
    ProjectUnitLoaderFactory,
    TowerFloorLoaderFactory,
    UnitModelLoaderFactory,
    ModelFileLoaderFactory,
    ModelTypeLoaderFactory,
    UnitProjectLoaderFactory,
    ModelProjectLoaderFactory,
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
