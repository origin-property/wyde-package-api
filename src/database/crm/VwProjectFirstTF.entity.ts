import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity('vw_ProjectFirstTF')
export class VwProjectFirstTF {
  @ViewColumn({ name: 'ProjectID' })
  projectId: string;

  @ViewColumn({ name: 'FirstTFDate' })
  firstTFDate: Date;

  @ViewColumn({ name: 'isJV' })
  isJV: string;

  @ViewColumn({ name: 'projectnameEng' })
  projectNameEng: string;
}
