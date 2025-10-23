import { Base } from '@/shared/@types/base';
import { AttachmentType } from '@/shared/enums/file.enum';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class File extends Base {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  refId: string;

  @Field(() => String)
  fileName: string;

  @Field(() => String)
  filePath: string;

  @Field(() => String)
  fileBucket: string;

  @Field(() => Boolean, { defaultValue: true })
  isPublic: boolean;

  @Field(() => String, { nullable: true })
  projectId: string;

  @Field(() => AttachmentType, { nullable: true })
  attachmentType: AttachmentType;
}
