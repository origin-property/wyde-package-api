import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { User } from '../dto/user.dto';

@InputType()
export class CreateUserInput extends PartialType(
  OmitType(User, ['createdAt', 'updatedAt', 'deletedAt'], InputType),
) {}
