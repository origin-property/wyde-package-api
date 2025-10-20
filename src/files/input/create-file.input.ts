import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { File } from '../dto/file.dto';

@InputType()
export class CreateFileInput extends PartialType(
  OmitType(
    File,
    ['id', 'fileBucket', 'createdAt', 'updatedAt', 'deletedAt'],
    InputType,
  ),
) {}
