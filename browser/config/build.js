var path = require('path');
var del = require('del');
var cp = require('glob-copy');
var exec = require('child_process').exec;

var root = '..';//path.resolve(__dirname, '..');

var delOptions = {
  cwd: root,
  force: true
};

var deleted = del.sync([
  'browser/dist/**',
  'cordova/www/**',
  '!cordova/www',
  '!cordova/www/.keep'
], delOptions);

console.log('Cleaned files:');
console.log(deleted.join('\n'));

console.log('\nRunning npm build script...');
exec('npm run build-webpack', function (err, stdout, stderr) {
  console.log(stdout);
  console.log(stderr);
  if (err) console.log(err);

  cp(root + '/browser/dist/**/*', root + '/cordova/www', function (cErr) {
    if (cErr) {
      console.log(cErr);
    } else {
      console.log('Copied: browser/dist to cordova/www');
    }
  });
});
