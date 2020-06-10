import type { Criterion as OCDSCriterion, RequirementGroup } from 'ts4ocds/extensions/requirements';

import type { Classification } from './classification';
import type { Identifier } from './identifier';
import type { Requirement } from './requirement';

import type { RequiredFields } from '../utils';

interface Legislation {
  version: string;
  identifier: Identifier;
  type: string;
  article: string;
}

export type Criterion = RequiredFields<
  OCDSCriterion<RequirementGroup<Requirement>>,
  'title' | 'description' | 'requirementGroups'
> & {
  classification?: Classification;
  additionalClassifications?: Classification[];
  legislation?: Legislation[];
};
