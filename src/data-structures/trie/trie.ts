/**
 * data-structure-typed
 *
 * @author Tyler Zeng
 * @copyright Copyright (c) 2022 Tyler Zeng <zrwusa@gmail.com>
 * @license MIT License
 */
export class TrieNode {
  constructor(key: string) {
    this._key = key;
    this._isEnd = false;
    this._children = new Map<string, TrieNode>();
  }

  private _key;

  get key(): string {
    return this._key;
  }

  set key(v: string) {
    this._key = v;
  }

  protected _children: Map<string, TrieNode>;

  get children(): Map<string, TrieNode> {
    return this._children;
  }

  set children(v: Map<string, TrieNode>) {
    this._children = v;
  }

  protected _isEnd: boolean;

  get isEnd(): boolean {
    return this._isEnd;
  }

  set isEnd(v: boolean) {
    this._isEnd = v;
  }
}

export class Trie {
  constructor(words?: string[], caseSensitive = true) {
    this._root = new TrieNode('');
    this._caseSensitive = caseSensitive;
    if (words) {
      for (const i of words) {
        this.add(i);
      }
    }
  }

  protected _root: TrieNode;

  get root() {
    return this._root;
  }

  set root(v: TrieNode) {
    this._root = v;
  }

  private readonly _caseSensitive: boolean;

  add(word: string): boolean {
    word = this._caseProcess(word);
    let cur = this.root;
    for (const c of word) {
      let nodeC = cur.children.get(c);
      if (!nodeC) {
        nodeC = new TrieNode(c);
        cur.children.set(c, nodeC);
      }
      cur = nodeC;
    }
    cur.isEnd = true;
    return true;
  }

  has(word: string): boolean {
    word = this._caseProcess(word);
    let cur = this.root;
    for (const c of word) {
      const nodeC = cur.children.get(c);
      if (!nodeC) return false;
      cur = nodeC;
    }
    return cur.isEnd;
  }

  private _caseProcess(str: string) {
    if (!this._caseSensitive) {
      str = str.toLowerCase(); // Convert str to lowercase if case-insensitive
    }
    return str;
  }

  remove(word: string) {
    word = this._caseProcess(word);
    let isDeleted = false;
    const dfs = (cur: TrieNode, i: number): boolean => {
      const char = word[i];
      const child = cur.children.get(char);
      if (child) {
        if (i === word.length - 1) {
          if (child.isEnd) {
            if (child.children.size > 0) {
              child.isEnd = false;
            } else {
              cur.children.delete(char);
            }
            isDeleted = true;
            return true;
          }
          return false;
        }
        const res = dfs(child, i + 1);
        if (res && !cur.isEnd && child.children.size === 0) {
          cur.children.delete(char);
          return true;
        }
        return false;
      }
      return false;
    };

    dfs(this.root, 0);
    return isDeleted;
  }

  getHeight() {
    const beginRoot = this.root;
    let maxDepth = 0;
    if (beginRoot) {
      const bfs = (node: TrieNode, level: number) => {
        if (level > maxDepth) {
          maxDepth = level;
        }
        const {children} = node;
        if (children) {
          for (const child of children.entries()) {
            bfs(child[1], level + 1);
          }
        }
      };
      bfs(beginRoot, 0);
    }
    return maxDepth;
  }

  // --- start additional methods ---
  /**
   * The function checks if a given input string has an absolute prefix in a tree data structure.Only can present as a prefix, not a word
   * @param {string} input - The input parameter is a string that represents the input value for the function.
   * @returns a boolean value.
   */
  isPurePrefix(input: string): boolean {
    input = this._caseProcess(input);
    let cur = this.root;
    for (const c of input) {
      const nodeC = cur.children.get(c);
      if (!nodeC) return false;
      cur = nodeC;
    }
    return !cur.isEnd;
  }

  /**
   * The function checks if a given input string is a prefix of any existing string in a tree structure.Can present as a abs prefix or word
   * @param {string} input - The input parameter is a string that represents the prefix we want to check.
   * @returns a boolean value.
   */
  isPrefix(input: string): boolean {
    input = this._caseProcess(input);
    let cur = this.root;
    for (const c of input) {
      const nodeC = cur.children.get(c);
      if (!nodeC) return false;
      cur = nodeC;
    }
    return true;
  }

  /**
   * The function checks if the input string is a common prefix in a Trie data structure.Check if the input string is the common prefix of all the words
   * @param {string} input - The input parameter is a string that represents the common prefix that we want to check for
   * in the Trie data structure.
   * @returns a boolean value indicating whether the input string is a common prefix in the Trie data structure.
   */
  isCommonPrefix(input: string): boolean {
    input = this._caseProcess(input);
    let commonPre = '';
    const dfs = (cur: TrieNode) => {
      commonPre += cur.key;
      if (commonPre === input) return;
      if (cur.isEnd) return;
      if (cur && cur.children && cur.children.size === 1) dfs(Array.from(cur.children.values())[0]);
      else return;
    };
    dfs(this.root);
    return commonPre === input;
  }

  /**
   * The function `getLongestCommonPrefix` returns the longest common prefix among all the words stored in a Trie data
   * structure.
   * @returns The function `getLongestCommonPrefix` returns a string, which is the longest common prefix found in the
   * Trie.
   */
  getLongestCommonPrefix(): string {
    let commonPre = '';
    const dfs = (cur: TrieNode) => {
      commonPre += cur.key;
      if (cur.isEnd) return;
      if (cur && cur.children && cur.children.size === 1) dfs(Array.from(cur.children.values())[0]);
      else return;
    };
    dfs(this.root);
    return commonPre;
  }

  /**
   * The `getAll` function returns an array of all words in a Trie data structure that start with a given prefix.
   * @param {string} prefix - The `prefix` parameter is a string that represents the prefix that we want to search for in the
   * trie. It is an optional parameter, so if no prefix is provided, it will default to an empty string.
   * @param {number} max - The max count of words will be found
   * @returns an array of strings.
   */
  getWords(prefix = '', max = Number.MAX_SAFE_INTEGER): string[] {
    prefix = this._caseProcess(prefix);
    const words: string[] = [];
    let found = 0;

    function dfs(node: TrieNode, word: string) {
      for (const char of node.children.keys()) {
        const charNode = node.children.get(char);
        if (charNode !== undefined) {
          dfs(charNode, word.concat(char));
        }
      }
      if (node.isEnd) {
        if (found > max - 1) return;
        words.push(word);
        found++;
      }
    }

    let startNode = this.root;

    if (prefix) {
      for (const c of prefix) {
        const nodeC = startNode.children.get(c);
        if (nodeC) startNode = nodeC;
      }
    }
    if (startNode !== this.root) dfs(startNode, prefix);

    return words;
  }

  // --- end additional methods ---
}
