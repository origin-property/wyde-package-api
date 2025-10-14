import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { File } from '../entities/file.entity';

@InputType()
export class CreateFileInput extends PartialType(
  OmitType(
    File,
    ['id', 'fileBucket', 'createdAt', 'updatedAt', 'deletedAt'],
    InputType,
  ),
) {}
