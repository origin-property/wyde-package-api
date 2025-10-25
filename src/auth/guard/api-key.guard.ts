import {
  BadRequestException,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiKeyService } from '../api-key.service';

@Injectable()
export class ApiKeyGuard extends AuthGuard('api-key') {
  constructor(private readonly apiKeyService: ApiKeyService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['api-key'];

    if (!apiKey) {
      throw new BadRequestException('API key is required');
    }

    const apiKeyEntity = await this.apiKeyService.validate(apiKey);

    if (!apiKeyEntity) {
      throw new UnauthorizedException('Invalid API key');
    }

    return true;
  }
}
