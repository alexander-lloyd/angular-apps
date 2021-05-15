/* eslint-env node */
module.exports = {
    preset: '../../jest.preset.js',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
            astTransformers: {
                before: [
                    'jest-preset-angular/build/InlineFilesTransformer',
                    'jest-preset-angular/build/StripStylesTransformer'
                ]
            }
        },
        // Normally injected by webpack
        'BUILD_TIME': 1613833105241,
        'COMMIT_HASH': 'f4742bb',
        'VERSION': '1.0.0'
    },
    coverageDirectory: '../../coverage/apps/todo',

    displayName: 'todo',
    snapshotSerializers: [
        'jest-preset-angular/build/serializers/no-ng-attributes',
        'jest-preset-angular/build/serializers/ng-snapshot',
        'jest-preset-angular/build/serializers/html-comment'
    ]
};
