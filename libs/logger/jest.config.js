/* eslint-env node */

module.exports = {
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/logger',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  displayName: 'logger',
};
