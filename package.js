// package metadata file for Meteor.js

/* global Package:true */

Package.describe({
  name: 'kimsQ:ratchet-plus',  // http://atmospherejs.com/twbs/bootstrap
  summary: 'The most popular front-end framework for developing responsive, mobile only projects on the web.',
  version: '1.0.0-alpha.1',
  git: 'https://github.com/kimsQ/rc.git'
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.0');
  api.use('jquery', 'client');
  api.addFiles([
    'dist/css/ratchet-plus.css',
    'dist/js/ratchet-plus.js'
  ], 'client');
});
