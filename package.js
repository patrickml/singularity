Package.describe({
  name: 'patrickml:singularity',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Object Document Mapper (ODM) for MeteorJS',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/patrickml/singularity',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3');
  api.use([
    'ecmascript',
    'meteorhacks:aggregate'
  ]);
  api.mainModule('entry.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('patrickml:singularity');
  api.mainModule('singularity-tests.js');
});
