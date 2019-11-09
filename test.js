'use strict';

/**
 * Package Versioning & Tagging
 * - Version별 Tagging 기록
 * - 가장 최신 버전 기준으로 업데이트 유지
 *
 * @author lyw31136@29cm.co.kr
 * @since 19.11.09
 * @description
 * - node scripts/version.js -- {VERSION_TYPES 중 하나}
 * - node scripts/version.js -- prerelease
 * --> prerelease, preminor, minor의 versioning는 semver 규칙을 따름 @tutorial https://semver.org/
 * --> prerelease 로 적용된 version 은 'develop' tagging 이 붙음
 */

// base module
var childProcess = require('child_process');
var execSync = childProcess.execSync;
var exec = childProcess.exec;
var semver = require('./semver.js');

// enviornment
var VERSION_TYPES = {
  minor: 'stable',
  preminor: 'release',
  prerelease: 'develop'
}

// package 이름
var pkgName = require('./package.json').name;

// excute buffer
var buffer = { maxBuffer: 1024 * 5000 };


function versionInject(type) {
  // update 할 version 의 타입 유효성 체크
  if (Object.keys(VERSION_TYPES).indexOf(type) === -1) {
    console.log('Error:: Invalid Version Inject (required among \"minor\", \"preminor\", \"prerelease\")');
    process.exit(1);
  }

  /**
   * 업데이트 할 버전 도출
   * - 항상 publish 된 package 의 최신버전을 기준으로 업데이트 하기 위해,
   *   stable 버전과 그 외의 진행 할 tagging 버전(release, develop)을 비교하여 기준 버전을 도출한다.
   * - 기준 버전에서 update 할 versioning 으로 업데이트 진행
   */

  // tagging 버전
  var taggingVer = VERSION_TYPES[type];
  // 현재 tagging 버전의 최신 버전
  var stdoutVersionExcute = execSync('npm view ' + pkgName + '@' + taggingVer + ' version', buffer);
  var version = stdoutVersionExcute.toString().trim();
  // tagging 하기 전의 기준이 될 버전
  var baseVersion;

  if (taggingVer === 'stable') {
    baseVersion = version;
  } else {
    var stableExcute = execSync('npm view ' + pkgName + '@stable version', buffer);
    var stableVersion = stableExcute.toString().trim();
    // ex : 1.3.0-1 을 1.3.0 으로 변환
    var compareVersion = semver.valid(semver.coerce(version));

    baseVersion = semver.gt(stableVersion, compareVersion) ? stableVersion : compareVersion;
  }

  // 업데이트 할 버전
  var willVersion = semver.inc(baseVersion, type);

  // excute : version update(npm)
  var cmd = 'npm version ' + willVersion + ' --no-git-tag-version';
  exec(cmd , buffer, function(err, stdout, stderr) {
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

      // 성공적으로 version update 되었을 시에 tagging 및 remote 로 publish 진행
      var publishCmd = 'npm publish --tag=' + taggingVer;
      console.log('## excute::' + publishCmd + '##');
      var publishExcute = execSync(publishCmd, buffer);
      console.log('## publish Complete', publishExcute.toString().trim() + ' ##');
      console.log('## publish tagging is ', taggingVer + ' ##');
      console.log('## publish version is ', willVersion + ' ##');
      console.log('## install guide : $ npm install ' + pkgName + '@' + taggingVer + ' --no-save ##');
  }).stdout.pipe(process.stdout);
}

function init() {
  var argv = process.argv;
  var versionType = argv[3] || null;

  if (!versionType) {
    console.log('Error:: Nothing Version Inject (required among \"minor\", \"preminor\", \"prerelease\")');
    process.exit(1);
  }

  versionInject(versionType);
}

init();
