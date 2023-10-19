#!/bin/bash

# Function to prompt for a directory path with a default value
prompt_for_directory() {
  local message="$1"
  local default_path="$2"
  read -p "$message [$default_path]: " user_path
  echo "${user_path:-$default_path}"
}

# Prompt for the source directory path
source_dir=$(prompt_for_directory "Enter the source directory" "/Users/revone/projects/data-structure-typed")

# Prompt for the destination directory path
individuals_dir=$(prompt_for_directory "Enter the destination directory" "/Users/revone/projects/data-structure-typed-individuals")


# Read the version variable from package.json
version_prompted=$(jq -r .version package.json)

cd "$individuals_dir"

# List of directories
directories=(
    "avl-tree-typed"
    "binary-tree-typed"
    "bst-typed"
    "deque-typed"
    "directed-graph-typed"
    "doubly-linked-list-typed"
    "graph-typed"
    "heap-typed"
    "linked-list-typed"
    "max-heap-typed"
    "max-priority-queue-typed"
    "min-heap-typed"
    "min-priority-queue-typed"
    "priority-queue-typed"
    "singly-linked-list-typed"
    "queue-typed"
    "stack-typed"
    "tree-multiset-typed"
    "trie-typed"
    "undirected-graph-typed"
)

# Loop through each directory
for dir in "${directories[@]}"; do
    cd "$dir" || exit

    # Update package.json version
    npm version "$version_prompted"

#    jq ".dependencies[\"data-structure-typed\"] = \"$version_prompted\"" package.json > temp.json
#    mv temp.json package.json

    # Install data-structure-typed package and build
    npm i data-structure-typed@"$version_prompted"
    npm run build:publish

    cd ..
done

echo "All packages updated and built."

cd "$source_dir"
