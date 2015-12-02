Package.describe({
  name: 'jasonnathan:wordpress-dev-api',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: "Interacts with the Wordpress.com's official API to retrieve wordpress data",
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/jasonnathan/meteor-wordpress-json-api/',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.on_use(function(api){
  api.versionsFrom('1.1.0.3');
  api.export('Wordpress',['server','client']);
  api.use(["underscore","templating"],"client");
  api.use("http","server");
  api.add_files("server.js","server");
  api.add_files(["templates.html","client.js"],"client");
  api.add_files("shared.js",['server','client']);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('jasonnathan:wordpress-json-api');
  api.addFiles('wordpress-json-api-tests.js');
});
