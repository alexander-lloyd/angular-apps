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
    snapshotSerializers: [
        'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
        'jest-preset-angular/build/AngularSnapshotSerializer.js',
        'jest-preset-angular/build/HTMLCommentSerializer.js'
    ],
    displayName: 'todo'
};
