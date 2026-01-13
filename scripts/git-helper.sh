#!/bin/bash
# Git Collaboration Helper Script
# This script demonstrates common git operations for collaborators

echo "==========================================="
echo "GIT COLLABORATION HELPER SCRIPT"
echo "==========================================="

case "$1" in
  "status")
    echo "Checking repository status..."
    git status
    ;;
  "sync")
    echo "Syncing with remote repository..."
    echo "Fetching latest changes..."
    git fetch origin
    echo "Updating local branch..."
    git pull origin $(git branch --show-current)
    ;;
  "create-branch")
    if [ -z "$2" ]; then
      echo "Usage: $0 create-branch <branch-name>"
      exit 1
    fi
    echo "Creating new feature branch: $2"
    git checkout -b "feature/$2"
    ;;
  "prepare-pr")
    echo "Preparing for pull request..."
    echo "Current branch: $(git branch --show-current)"
    echo "Last few commits:"
    git log --oneline -5
    echo ""
    echo "Files changed:"
    git diff --name-only HEAD~1
    ;;
  "show-stats")
    echo "Repository statistics:"
    echo "Total commits: $(git rev-list --count HEAD)"
    echo "Total files: $(git ls-files | wc -l)"
    echo "Branches: $(git branch -a | wc -l)"
    echo "Authors: $(git shortlog -sn | wc -l)"
    ;;
  *)
    echo "Available commands:"
    echo "  $0 status           - Show repository status"
    echo "  $0 sync             - Sync with remote repository"
    echo "  $0 create-branch <name> - Create a new feature branch"
    echo "  $0 prepare-pr       - Show info before creating PR"
    echo "  $0 show-stats       - Show repository statistics"
    echo ""
    echo "Example: $0 create-branch add-new-feature"
    ;;
esac

echo "==========================================="
echo "SCRIPT EXECUTION COMPLETE"
echo "==========================================="