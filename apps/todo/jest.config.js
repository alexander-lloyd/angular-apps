module.exports = {
  name: 'todo',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/todo',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
