/* eslint-env node */

/* eslint-disable-rule array-bracket-newline */

// 2 Spaces per indentation
const INDENT = 2;
const MAX_CLASSES_PER_FILE = 2;
const MAX_COMPLEXITY = 10;
const MAX_LINE_LENGTH = 120;
const MAX_LINES = 200;
const MAX_LINES_PER_FUNCTION = 10;
const MAX_PARAMETERS = 6;

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: [
    '@typescript-eslint',
    '@nrwl/nx',
    'jsdoc'
  ],
  extends: [
    'eslint:all',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:jsdoc/recommended',
  ],
  reportUnusedDisableDirectives: true,
  rules: {
    '@typescript-eslint/indent': ['error', INDENT, {
      ignoredNodes: ['JSXElement *', 'JSXElement']
    }],
    '@typescript-eslint/no-empty-interface': 'warn',
    '@typescript-eslint/no-extra-parens': ['error', 'all', {
      ignoreJSX: 'multi-line',
      nestedBinaryExpressions: false
    }],
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/semi': 'error',
    '@nrwl/nx/enforce-module-boundaries': [
      'error',
      {
        'enforceBuildableLibDependency': true,
        'allow': [],
        'depConstraints': [
          { 'sourceTag': '*', 'onlyDependOnLibsWithTags': ['*'] }
        ]
      }
    ],
    'array-bracket-newline': ['off'],
    'array-element-newline': ['error', 'consistent'],
    'complexity': ['error', MAX_COMPLEXITY],
    'consistent-return': 'error',
    'class-methods-use-this': 'off',
    'curly': 'error',
    'default-case': 'error',
    'default-param-last': 'off',
    'dot-location': ['error', 'property'],
    'func-style': ['error', 'declaration', {
      'allowArrowFunctions': true
    }],
    'function-call-argument-newline': 'off',
    'id-length': 'off',
    // Use @typescript-eslint version instead.
    'indent': 'off',
    'init-declarations': 'off',
    'jsdoc/no-bad-blocks': 'error',
    'jsdoc/no-types': 0,
    'jsdoc/require-jsdoc': ['warn', {
      contexts: ['TSInterfaceDeclaration'],
      exemptEmptyFunctions: true,
      publicOnly: true,
      require: {
        ArrowFunctionExpression: true,
        ClassDeclaration: true,
        ClassExpression: true,
        FunctionDeclaration: true,
        FunctionExpression: true,
        MethodDefinition: true
      }
    }],
    'jsdoc/require-param-type': 'off',
    'jsdoc/require-returns-type': 'off',
    'lines-around-comment': 'off',
    'lines-between-class-members': ['error', 'always', {
      exceptAfterSingleLine: true
    }],
    'max-classes-per-file': ['warn', MAX_CLASSES_PER_FILE],
    'max-len': ['warn', MAX_LINE_LENGTH],
    'max-lines': ['warn', MAX_LINES],
    'max-lines-per-function': ['error', MAX_LINES_PER_FUNCTION],
    'max-params': ['error', MAX_PARAMETERS],
    'max-statements': ['warn', MAX_LINES_PER_FUNCTION],
    'multiline-ternary': ['error', 'always-multiline'],
    'new-cap': ['error', {capIsNewExceptions: ['Component', 'Directive', 'Injectable', 'NgModule']}],
    'no-console': 'warn',
    'no-continue': 'off',
    'no-extra-parens': 'off',
    'no-magic-numbers': 'warn',
    'no-plusplus': 'off',
    'no-sync': 'off',
    'no-ternary': 'off',
    'no-undefined': 'off',
    'no-underscore-dangle': 'off',
    'no-useless-constructor': 'off',
    'no-warning-comments': 'warn',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'never'],
    'one-var': ['error', 'never'],
    'padded-blocks': ['error', 'never'],
    'quotes': ['error', 'single', {
      'avoidEscape': true,
      'allowTemplateLiterals': true
    }],
    'quote-props': ['error', 'consistent'],
    'space-before-function-paren': 'off',
    'sort-imports': 'off',
    'sort-keys': 'off'
  },
  overrides: [
    {
      extends: [
        'plugin:jest/all'
      ],
      files: [
        '*.spec.ts'
      ],
      rules: {
        'jest/lowercase-name': ['error', {ignore: ['describe']}],
        'jest/no-hooks': ['error', {allow: ['beforeEach', 'afterEach']}],
        'jest/no-truthy-falsy': 'off',
        'max-lines-per-function': 'off',
        'no-magic-numbers': 'off'
      }
    },
    {
      // Exclude e2e tests
      files: [
        'src/integration/*.spec.ts'
      ],
      rules: {
        'jest/expect-expect': 'off',
        'jest/prefer-expect-assertions': 'off'
      }
    }
  ]
};
