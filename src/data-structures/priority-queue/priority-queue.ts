/**
 * data-structure-typed
 *
 * @author Kirk Qi
 * @copyright Copyright (c) 2022 Kirk Qi <qilinaus@gmail.com>
 * @license MIT License
 */

import {Heap} from '../heap';
import {CompareFunction} from '../../types';

export class PriorityQueue<E> extends Heap<E> {
  constructor(comparator: CompareFunction<E>) {
    super(comparator);
  }
}
