/**
 * @copyright 2030 Tyler Zeng <zrwusa@gmail.com>
 * @license MIT
 */
export class BinaryIndexedTree {
    private readonly _sumTree: number[];

    constructor(n: number) {
        this._sumTree = new Array<number>(n + 1).fill(0);
    }

    static lowBit(x: number) {
        return x & (-x);
    }

    /**
     * The update function updates the values in a binary indexed tree by adding a delta value to the specified index and
     * its ancestors.
     * @param {number} i - The parameter `i` represents the index of the element in the `_sumTree` array that needs to be
     * updated.
     * @param {number} delta - The "delta" parameter represents the change in value that needs to be added to the element
     * at index "i" in the "_sumTree" array.
     */
    update(i: number, delta: number) {
        while (i < this._sumTree.length) {
            this._sumTree[i] += delta;
            i += BinaryIndexedTree.lowBit(i);
        }
    }

    /**
     * The function calculates the prefix sum of an array using a binary indexed tree.
     * @param {number} i - The parameter "i" in the function "getPrefixSum" represents the index of the element in the
     * array for which we want to calculate the prefix sum.
     * @returns The function `getPrefixSum` returns the prefix sum of the elements in the binary indexed tree up to index
     * `i`.
     */
    getPrefixSum(i: number) {
        let sum = 0;
        while (i > 0) {
            sum += this._sumTree[i];
            i -= BinaryIndexedTree.lowBit(i);
        }
        return sum;
    }

    /**
     * The function `getRangeSum` calculates the sum of a range of numbers in an array.
     * @param {number} start - The start parameter is the starting index of the range for which we want to calculate the
     * sum.
     * @param {number} end - The "end" parameter represents the ending index of the range for which we want to calculate
     * the sum.
     * @returns the sum of the elements in the range specified by the start and end indices.
     */
    public getRangeSum(start: number, end: number): number {
        if (!(0 <= start && start <= end && end <= this._sumTree.length))
            throw 'Index out of bounds';
        return this.getPrefixSum(end) - this.getPrefixSum(start);
    }
}
