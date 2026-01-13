#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');

const program = new Command();

const templates = {
  minimal: `
# {{title}}

{{description}}

## Installation
\`\`\`bash
npm install {{name}}
\`\`\`

## Usage
\`\`\`javascript
const {{camelCase name}} = require('{{name}}');
\`\`\`
`,
  
  modern: `
# {{title}}

{{description}}

![npm version](https://img.shields.io/npm/v/{{name}})
![GitHub stars](https://img.shields.io/github/stars/yourusername/{{name}})
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Build Status](https://img.shields.io/github/workflows/CI/yourusername/{{name}})

## 📦 Installation

### npm
\`\`\`bash
npm install {{name}}
\`\`\`

### yarn
\`\`\`bash
yarn add {{name}}
\`\`\`

## ✨ Features

- ⚡ High performance
- 🎯 Zero dependencies
- 🛡️ Type safe
- 📱 Cross-platform
- 🧪 Well tested

## 🚀 Quick Start

\`\`\`javascript
const {{camelCase name}} = require('{{name}}');

// Basic usage
{{camelCase name}}();
\`\`\`

## 📚 API Reference

### {{pascalCase name}}(options)

Creates a new instance with the provided options.

**Parameters:**
- \`options\` (Object) - Configuration options
- \`options.theme\` (string) - Theme to use
- \`options.verbose\` (boolean) - Enable verbose output

**Example:**
\`\`\`javascript
const {{camelCase name}} = require('{{name}}');

{{camelCase name}}({
  theme: 'dark',
  verbose: true
});
\`\`\`

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md).

**Development Setup:**
\`\`\`bash
# Clone the repository
git clone https://github.com/yourusername/{{name}}.git
cd {{name}}

# Install dependencies
npm install

# Run tests
npm test

# Start development
npm run dev
\`\`\`

## 📄 License

MIT © [Author](LICENSE)

---

⭐ If this tool helped you, give it a star!
`,
  
  detailed: `
# {{title}}

{{description}}

![Build Status](https://img.shields.io/github/workflows/CI/yourusername/{{name}})
![Coverage](https://img.shields.io/codecov/c/github/yourusername/{{name}})
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![npm version](https://img.shields.io/npm/v/{{name}})
![npm downloads](https://img.shields.io/npm/dm/{{name}})

## 📋 Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## 🔧 Installation

### Requirements

- Node.js >= 14.0.0
- npm >= 6.0.0

### Using npm

\`\`\`bash
npm install {{name}}
\`\`\`

### Using yarn

\`\`\`bash
yarn add {{name}}
\`\`\`

### Using pnpm

\`\`\`bash
pnpm add {{name}}
\`\`\`

## 📖 Usage

### Basic Example

\`\`\`javascript
const {{camelCase name}} = require('{{name}}');

const instance = new {{camelCase name}}();
instance.doSomething();
\`\`\`

### Advanced Example

\`\`\`javascript
const {{camelCase name}} = require('{{name}}');

const instance = new {{camelCase name}}({
  option1: 'value1',
  option2: 'value2',
  option3: true
});

await instance.process();
\`\`\`

## 📚 API Reference

### Constructor

#### new {{pascalCase name}}(options)

Creates a new instance of {{name}}.

**Parameters:**
- \`options\` (Object) - Configuration object

**Options:**
- \`options.option1\` (string, default: 'default1') - Description of option1
- \`options.option2\` (number, default: 42) - Description of option2
- \`options.option3\` (boolean, default: false) - Description of option3

**Throws:**
- \`Error\` - When invalid options are provided

**Example:**
\`\`\`javascript
const instance = new {{pascalCase name}}({
  option1: 'custom value',
  option3: true
});
\`\`\`

### Methods

#### .doSomething(input)

Performs the main action.

**Parameters:**
- \`input\` (string) - Input to process

**Returns:**
- \`Promise<string>\` - Processed result

**Example:**
\`\`\`javascript
const result = await instance.doSomething('hello');
console.log(result);
// Output: 'processed: hello'
\`\`\`

#### .process()

Processes all queued items.

**Returns:**
- \`Promise<Array>\` - Array of processed items

#### .getConfig()

Returns current configuration.

**Returns:**
- \`Object\` - Current config object

#### .updateConfig(newConfig)

Updates configuration.

**Parameters:**
- \`newConfig\` (Object) - New configuration object

**Example:**
\`\`\`javascript
instance.updateConfig({
  option1: 'new value',
  option2: 100
});
\`\`\`

## 🎯 Examples

Check out the [examples](./examples) directory for more comprehensive usage examples:

- [Basic Usage](./examples/basic.js)
- [Advanced Configuration](./examples/advanced.js)
- [Error Handling](./examples/error-handling.js)
- [Integration Tests](./examples/integration-test.js)

## 🧪 Testing

\`\`\`bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
\`\`\`

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md).

### Development Setup

\`\`\`bash
# Clone the repository
git clone https://github.com/yourusername/{{name}}.git
cd {{name}}

# Install dependencies
npm install

# Run tests
npm test

# Start development
npm run dev

# Build the project
npm run build
\`\`\`

### Code Style

- Use 2 spaces for indentation
- Follow conventional commit messages
- Add JSDoc comments for public functions
- Write meaningful tests
- Keep functions small and focused

### Submitting Changes

1. Fork the repository
2. Create a feature branch: \`git checkout -b feature/amazing-feature\`
3. Make your changes
4. Run tests: \`npm test\`
5. Commit your changes: \`git commit -m 'feat: add amazing feature'\`
6. Push to branch: \`git push origin feature/amazing-feature\`
7. Create a pull request

## 📄 License

MIT © [Your Name](LICENSE)

---

⭐ If this tool helped you, give it a star! 🚀
`
};

function camelCase(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}

function pascalCase(str) {
  return camelCase(str).charAt(0).toUpperCase() + camelCase(str).slice(1);
}

function replaceVariables(template, variables) {
  let result = template;  
  // Replace common variables
  Object.keys(variables).forEach(key => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(regex, variables[key]);
  });
  
  return result;
}

program
  .name('awesome-readme')
  .description('Generate awesome README files')
  .version('1.0.0');

program
  .command('init')
  .description('Initialize a new README project')
  .action(async () => {
    console.log(chalk.blue('🚀 Initializing Awesome README Generator...'));
    
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Project title:',
        default: 'My Awesome Project'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Project description:',
        default: 'An awesome project that does amazing things'
      },
      {
        type: 'input',
        name: 'name',
        message: 'Package name:',
        default: 'my-awesome-project'
      },
      {
        type: 'list',
        name: 'template',
        message: 'Choose a template:',
        choices: ['minimal', 'modern', 'detailed'],
        default: 'modern'
      }
    ]);
    
    const variables = {
      title: answers.title,
      description: answers.description,
      name: answers.name,
      camelCaseName: camelCase(answers.name),
      pascalCaseName: pascalCase(answers.name)
    };
    
    const readme = replaceVariables(templates[answers.template], variables);
    
    await fs.writeFile('README.md', readme);
    console.log(chalk.green('✅ README.md generated successfully!'));
    console.log(chalk.yellow('📝 Edit the file to customize it further'));
  });

program
  .command('generate')
  .description('Generate README from existing package.json')
  .option('-t, --template <type>', 'Template type', 'modern')
  .action(async (options) => {
    try {
      const packageJson = await fs.readJson('./package.json');
      
      console.log(chalk.blue('📖 Generating README from package.json...'));
      
      const variables = {
        title: packageJson.name,
        description: packageJson.description || 'An amazing project',
        name: packageJson.name,
        camelCaseName: camelCase(packageJson.name),
        pascalCaseName: pascalCase(packageJson.name)
      };
      
      const readme = replaceVariables(templates[options.template], variables);
      
      await fs.writeFile('README.md', readme);
      console.log(chalk.green('✅ README.md generated successfully!'));
      console.log(chalk.yellow('📝 Edit the file to customize it further'));
    } catch (error) {
      console.error(chalk.red('❌ Error: package.json not found'));
      console.log(chalk.yellow('💡 Run "awesome-readme init" to create a new project'));
    }
  });

program
  .command('templates')
  .description('List available templates')
  .action(() => {
    console.log(chalk.blue('📋 Available Templates:'));
    Object.keys(templates).forEach((template, index) => {
      const descriptions = {
        minimal: 'Clean and simple',
        modern: 'Professional with badges and structured sections', 
        detailed: 'Comprehensive with extensive API documentation'
      };
      console.log(`${index + 1}. ${chalk.cyan(template)} - ${descriptions[template]}`);
    });
  });

program.parse();