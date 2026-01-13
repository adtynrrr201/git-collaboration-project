/**
 * Git Collaboration Project
 * A demonstration of proper git collaboration practices
 */

class GitCollaborationDemo {
  constructor() {
    this.projectName = 'Git Collaboration Project';
    this.purpose = 'Demonstrate proper git collaboration practices';
  }

  /**
   * Display project information
   */
  displayInfo() {
    console.log(`Project: ${this.projectName}`);
    console.log(`Purpose: ${this.purpose}`);
    console.log('Learn more at: docs/guides/CONTRIBUTING.md');
  }

  /**
   * Demonstrate collaboration best practices
   */
  demonstrateBestPractices() {
    const practices = [
      'Use descriptive commit messages',
      'Create feature branches for new work',
      'Write clear documentation',
      'Follow consistent code style',
      'Review code before merging'
    ];

    console.log('\nGit Collaboration Best Practices:');
    practices.forEach((practice, index) => {
      console.log(`${index + 1}. ${practice}`);
    });
  }
}

// Example usage
const demo = new GitCollaborationDemo();
demo.displayInfo();
demo.demonstrateBestPractices();

module.exports = GitCollaborationDemo;