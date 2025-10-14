import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserInput extends PartialType(
  OmitType(User, ['createdAt', 'updatedAt', 'deletedAt'], InputType),
) {}
