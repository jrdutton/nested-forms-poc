import { ChildInner } from '../child-inner/child-inner.model';

export interface ChildOuter {
  fa: { childInner: ChildInner }[];
}
