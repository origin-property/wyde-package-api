import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { Role } from '../entities/role.entity';

@InputType()
export class CreateRoleInput extends PartialType(
  OmitType(Role, ['id', 'createdAt', 'updatedAt', 'deletedAt'], InputType),
) {}
