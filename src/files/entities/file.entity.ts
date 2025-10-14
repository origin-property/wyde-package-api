import { Base } from '@/shared/@types/base';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class File extends Base {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  refId: string;

  @Field(() => String)
  fileId: string;

  @Field(() => String)
  fileType: string;

  @Field(() => String)
  fileName: string;

  @Field(() => String)
  fileFolder: string;

  @Field(() => String)
  filePath: string;

  @Field(() => String)
  fileBucket: string;

  @Field(() => String)
  fileExtension: string;

  @Field(() => Boolean, { defaultValue: true })
  isPublic: boolean;
}
