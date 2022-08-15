import { BaseHarnessFilters } from '@angular/cdk/testing';

export interface AddCommentHarnessFilters extends BaseHarnessFilters {
  comment?: string;
  valid?: boolean;
}
