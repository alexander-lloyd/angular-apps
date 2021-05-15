/* eslint-env node */
module.exports = {
    preset: '../../jest.preset.js',
    coverageDirectory: '../../coverage/libs/logger',

    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    displayName: 'logger',
    snapshotSerializers: [
        'jest-preset-angular/build/serializers/no-ng-attributes',
        'jest-preset-angular/build/serializers/ng-snapshot',
        'jest-preset-angular/build/serializers/html-comment'
    ]
};
