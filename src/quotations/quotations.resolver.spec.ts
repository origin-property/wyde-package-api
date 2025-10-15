import { Test, TestingModule } from '@nestjs/testing';
import { QuotationsResolver } from './quotations.resolver';
import { QuotationsService } from './quotations.service';

describe('QuotationsResolver', () => {
  let resolver: QuotationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuotationsResolver, QuotationsService],
    }).compile();

    resolver = module.get<QuotationsResolver>(QuotationsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
