/* eslint-env node */

/* eslint-disable-rule array-bracket-newline */

// 2 Spaces per indentation
const INDENT = 2;
const MAX_CLASSES_PER_FILE = 5;
const MAX_COMPLEXITY = 10;
const MAX_LINE_LENGTH = 120;
const MAX_LINES = 200;
const MAX_LINES_PER_FUNCTION = 20;
const MAX_PARAMETERS = 6;

module.exports = {
  root: true,
  reportUnusedDisableDirectives: true,
  plugins: [
    '@nrwl/nx',
    'jsdoc'
  ],
  extends: [
    'eslint:all',
    'plugin:jsdoc/recommended',
  ],
  rules: {
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
    'function-paren-newline': ['error', 'consistent'],
    'id-length': 'off',
    'indent': 'error',
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
    'new-cap': ['error', {
      capIsNewExceptions: [
        'Component',
        'Directive',
        'Effect',
        'Inject',
        'Injectable',
        'NgModule',
        'Optional'
      ]
    }],
    'no-console': 'warn',
    'no-continue': 'off',
    'no-extra-parens': 'off',
    'no-fallthrough': 'error',
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
    'semi': 'error',
    'space-before-function-paren': 'off',
    'sort-imports': 'off',
    'sort-keys': 'off'
  },
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        project: './tsconfig.json'
      },
      plugins: [
        '@typescript-eslint',
        '@angular-eslint'
      ],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript'
      ],
      rules: {
        '@angular-eslint/component-class-suffix': 'error',
        '@angular-eslint/contextual-lifecycle': 'error',
        // '@angular-eslint/directive-class-suffix': 'error',
        '@angular-eslint/component-selector': [
          'error',
          { type: 'element', prefix: 'al', style: 'kebab-case' },
        ],
        '@angular-eslint/directive-selector': [
          'error',
          { type: 'attribute', prefix: 'al', style: 'camelCase' },
        ],
        '@angular-eslint/no-conflicting-lifecycle': 'error',
        '@angular-eslint/no-host-metadata-property': 'error',
        '@angular-eslint/no-input-rename': 'error',
        '@angular-eslint/no-inputs-metadata-property': 'error',
        '@angular-eslint/no-output-native': 'error',
        '@angular-eslint/no-output-on-prefix': 'error',
        '@angular-eslint/no-output-rename': 'error',
        '@angular-eslint/no-outputs-metadata-property': 'error',
        '@angular-eslint/use-lifecycle-interface': 'warn',
        '@angular-eslint/use-pipe-transform-interface': 'error',
        '@typescript-eslint/array-type': ['error', {
          default: 'array-simple',
          readonly: 'array-simple'
        }],
        '@typescript-eslint/explicit-member-accessibility': 'error',
        '@typescript-eslint/indent': ['error', INDENT, {
          ignoredNodes: ['JSXElement *', 'JSXElement']
        }],
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/member-ordering': [
          'error',
          {
            default: [
              'static-field',
              'instance-field',
              'static-method',
              'instance-method',
            ],
          },
        ],
        '@typescript-eslint/no-empty-interface': 'error',
        '@typescript-eslint/no-empty-function': 'error',
        '@typescript-eslint/no-extra-parens': ['error', 'all', {
          ignoreJSX: 'multi-line',
          nestedBinaryExpressions: false
        }],
        '@typescript-eslint/no-inferrable-types': [
          'error',
          {
            ignoreParameters: true,
          },
        ],
        '@typescript-eslint/no-non-null-assertion': 'error',
        '@typescript-eslint/no-useless-constructor': 'error',
        '@typescript-eslint/semi': 'error',
        // Use @typescript-eslint version instead.
        'indent': 'off',
        'semi': 'off',
        'no-invalid-this': 'off',
        'no-restricted-imports': [
          'error',
          {
            paths: [
              {
                name: 'rxjs/Rx',
                message: "Please import directly from 'rxjs' instead",
              },
            ],
          },
        ],
      }
    },
    {
      files: ['*.component.html'],
      parser: '@angular-eslint/template-parser',
      plugins: ['@angular-eslint/template'],
      rules: {
        '@angular-eslint/template/banana-in-a-box': 'error',
        '@angular-eslint/template/no-negated-async': 'error',
      },
    },
    {
      files: ['*.component.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      plugins: ['@angular-eslint/template'],
      processor: '@angular-eslint/template/extract-inline-html',
    },
    {
      files: [
        '*.spec.ts'
      ],
      extends: [
        'plugin:jest/all'
      ],
      rules: {
        '@angular-eslint/component-class-suffix': ['error', {
          suffixes: ['Component', 'ComponentStub']
        }],
        '@typescript-eslint/no-empty-function': 'off',
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
        'jest/prefer-expect-assertions': 'off',
        'jest/valid-expect': 'off',
        'jest/valid-expect-in-promise': 'off'
      }
    }
  ]
};
