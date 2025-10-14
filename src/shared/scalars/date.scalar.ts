import { CustomScalar, Scalar } from '@nestjs/graphql';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { Kind, ValueNode } from 'graphql';

dayjs.extend(timezone);
dayjs.extend(utc);

@Scalar('Date', () => Date)
export class DateScalar implements CustomScalar<Date, Date> {
  description = 'Date custom scalar type (UTC)';

  parseValue(value: Date): Date {
    return dayjs(value).utc().toDate();
  }

  serialize(value: Date): Date {
    return dayjs(value).utc().toDate();
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.INT) {
      return dayjs(ast.value).utc().toDate();
    }
    return null;
  }
}
