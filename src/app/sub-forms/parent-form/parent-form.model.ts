import { ChildOuter } from '../child-outer/child-outer.model';
import { Child1 } from '../child1/child1.model';
import { Child2 } from '../child2/child2.model';

export interface ParentForm {
  fc: string;
  child1: Child1;
  child2: Child2;
  childOuter: ChildOuter;
}
