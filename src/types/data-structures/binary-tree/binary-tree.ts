import { BinaryTree, BinaryTreeNode } from '../../../data-structures';
import { IterationType } from "../../common";
import { Comparable } from "../../utils";

export type BinaryTreeNodeNested<K extends Comparable, V> = BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, BinaryTreeNode<K, V, any>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export type BinaryTreeNested<K extends Comparable, V, NODE extends BinaryTreeNode<K, V, NODE>> = BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, BinaryTree<K, V, NODE, any>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export type BinaryTreeOptions<K> = {
  iterationType?: IterationType
}
