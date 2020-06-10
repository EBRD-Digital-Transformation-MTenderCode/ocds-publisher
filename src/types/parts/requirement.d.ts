import { Requirement as OCDSRequirements } from 'ts4ocds/extensions/requirements';

import { RequiredFields } from '../utils';

interface EligibleEvidence {
  id: string;
  title: string;
  description?: string;
  type: string;
}

export type Requirement = RequiredFields<OCDSRequirements, 'title' | 'dataType'> & {
  eligibleEvidences?: EligibleEvidence[];
};
