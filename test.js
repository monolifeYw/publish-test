var childProcess = require('child_process');
var semver = require('./semver.js');
var VERSION_TYPES = {
  minor: 'stable',
  preminor: 'release',
  prerelease: 'develop'
}
var PKG_INFO = {
  name: 'comp-publish-test'
}

function versionInject(type) {
  if (Object.keys(VERSION_TYPES).indexOf(type) === -1) {
    console.log('Error:: Invalid Version Inject (required among \"minor\", \"preminor\", \"prerelease\")');
    process.exit(1);
  }

  var taggingVer = VERSION_TYPES[type];
  var stdoutVersionExcute = childProcess.execSync('npm view ' + PKG_INFO.name + '@' + taggingVer + ' version', { maxBuffer: 1024 * 5000 });
  var version = stdoutVersionExcute.toString().trim();
  var baseVersion;

  if (taggingVer === 'stable') {
    baseVersion = version;
  } else {
    var stableExcute = childProcess.execSync('npm view ' + PKG_INFO.name + '@stable version', { maxBuffer: 1024 * 5000 });
    var stableVersion = stableExcute.toString().trim();
    var compareVersion = semver.valid(semver.coerce(version));

    baseVersion = semver.gt(stableVersion, compareVersion) ? stableVersion : compareVersion;
  }

  var willVersion = semver.inc(baseVersion, type);
  var cmd = 'npm version ' + willVersion + ' --no-git-tag-version';
  childProcess.exec(cmd , { maxBuffer: 1024 * 5000 }, function(err, stdout, stderr) {
      if (stderr !== null) {
          console.log('[stderr]', stderr);
      }
      if (stdout !== null) {
          if (stdout.length) {
            console.log('[stdout]modify version is ' + stdout);
          } else {
            console.log('[stdout]error versioning');
          }
      }
      if (err !== null) {
          console.log('[err]', err);
          process.exit(1);
      }

      var publishCmd = 'npm publish --tag=' + taggingVer;
      console.log('## excute::' + publishCmd + '##');
      var publishExcute = childProcess.execSync(publishCmd, { maxBuffer: 1024 * 5000 });
      console.log('publishExcute Complete', publishExcute.toString().trim());
  }).stdout.pipe(process.stdout);
}

function init() {
  // node test.js -- prerelease

  console.log('process.argv', process.argv);
  var argv = process.argv;
  var versionType = argv[3] || null;

  if (!versionType) {
    console.log('Error:: Nothing Version Inject (required among \"minor\", \"preminor\", \"prerelease\")');
    process.exit(1);
  }

  versionInject(versionType);
}

init();

// console.log(semver.valid(semver.coerce('0.1.3-1')));
