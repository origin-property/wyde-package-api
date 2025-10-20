import { User } from '@/users/dto/user.dto';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Auth {
  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;

  @Field(() => Int)
  accessTokenExpires: number;

  @Field(() => Int)
  refreshTokenExpires: number;

  @Field(() => User)
  user: User;
}
