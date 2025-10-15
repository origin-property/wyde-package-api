import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity('vw_AgencyTier')
export class VwAgencyTier {
  @ViewColumn({ name: 'AgentName' })
  name: string;

  @ViewColumn({ name: 'taxID' })
  taxId: string;

  @ViewColumn({ name: 'TotalSellingPrice' })
  sellingPrice: number;

  @ViewColumn({ name: 'AgentTier' })
  tier: string;

  @ViewColumn({ name: 'BooKyear' })
  bookYear: number;
}
