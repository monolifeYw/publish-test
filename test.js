'use strict';

/**
 * Package Versioning & Tagging
 * - Version별 Tagging 기록
 * - 가장 최신 버전 기준으로 업데이트 유지
 *
 * @author lyw31136@29cm.co.kr
 * @since 19.11.09 - draft
 * @description
 * - node scripts/version.js -- {VERSION_TYPES 중 하나}
 * - node scripts/version.js -- prerelease
 * --> prerelease, preminor, minor의 versioning는 semver 규칙을 따름 @tutorial https://semver.org/
 * --> prerelease 로 적용된 version 은 'develop' tagging 이 붙음
 *
 * @todo
 * - package versioning test
 * - build.sh 용도 확인
 * - package install 확인
 * - Jenkins 구성 부분 확인 및 설계
 * -- 새로 만들 것, 수정할 것
 */

// base module
var childProcess = require('child_process');
var execSync = childProcess.execSync;
var exec = childProcess.exec;
var semver = require('./semver.js');
// package 이름
var pkg = require('../package.json');
var pkgName = pkg.name;
var pkgRegistryUrl = pkg.publishConfig.registry;

// enviornment
var VERSION_TYPES = {
  minor: 'latest',
  patch: 'patch',
  preminor: 'release',
  prerelease: 'develop'
}

// npm 기본 버전
var npmBaseVer = '0.0.0';

// excute buffer
var buffer = { maxBuffer: 1024 * 5000 };

/**
 * converte string to object
 * - 커스텀한 함수로 제작
 * - [제작이유] execSync를 사용하여, dist-tags 정보를 가져오려 할때, return 값은 Buffer, String
 *   기본 JSON 객체를 이용하려 하면 "unexpected token" error 발생
 *   (원인) : object 형태를 띤 string 에서의 param, value 는 반드시 쌍따옴표 형태를 가지고 있어야 함
 */
function converterStrToObj(str) {
  var matchStr = str.match(/{[^}]+}/).toString();
  var converterStr = matchStr.replace(/([a-zA-Z]+):/g,'"$1":').replace(/\'/g, '"');
  return JSON.parse(converterStr);
}

function getFindVersionCmd(pkgName, taggingVer) {
  var tagging = taggingVer === null ? '' : '@' + taggingVer;
  return 'npm view ' + pkgName + tagging + ' --registry ' + pkgRegistryUrl + ' version';
}

function versionInject(type) {
  // update 할 version 의 타입 유효성 체크
  if (Object.keys(VERSION_TYPES).indexOf(type) === -1) {
    console.log('Error:: Invalid Version Inject (required among \"minor\", \"preminor\", \"prerelease\")');
    process.exit(1);
  }

  /**
   * 업데이트 할 버전 도출
   * - 항상 publish 된 package 의 최신버전을 기준으로 업데이트 하기 위해,
   *   latest 버전과 그 외의 진행 할 tagging 버전(release, develop)을 비교하여 기준 버전을 도출한다.
   * - 기준 버전에서 update 할 versioning 으로 업데이트 진행
   */

  // tagging 버전
  var taggingVer = VERSION_TYPES[type];

  // 버전 정보
  var verExcute = execSync('npm view ' + pkgName + ' --registry ' + pkgRegistryUrl + ' dist-tags');
  var verDatas = converterStrToObj(verExcute.toString().trim());

  // latest 버전
  var latestVersion = verDatas['latest'] || npmBaseVer;

  // tagging 하기 전의 기준이 될 버전
  var baseVersion;

  // 현재 tagging 버전의 최신 버전
  // var stdoutVersionExcute = execSync(getFindVersionCmd(pkgName, taggingVer), buffer);
  var toTaggingVersion = verDatas[taggingVer] || npmBaseVer;

  // latest 버전이 없다면(태깅이 존재하지 않을때) 태깅 없는 버전의 마지막 버전 번호르 가져온다.
  if (latestVersion === npmBaseVer) {
    var latestExcute = execSync(getFindVersionCmd(pkgName, null));
    latestVersion = latestExcute.toString().trim();
  }

  if (taggingVer === 'latest') {
    baseVersion = latestVersion;
  } else {
    // ex : 1.3.0-1 을 1.3.0 으로 변환
    var compareVersion = semver.valid(semver.coerce(toTaggingVersion));
    baseVersion = semver.gt(latestVersion, compareVersion) ? latestVersion : compareVersion;
  }

  // 업데이트 할 버전
  var willVersion = semver.inc(baseVersion, type);

  // excute : version update(npm)
  var cmd = 'npm version ' + willVersion + ' --no-git-tag-version';
  exec(cmd , buffer, function(err, stdout, stderr) {
      if (stderr !== null) {
          console.log(stderr);
      }
      if (stdout !== null) {
          if (stdout.length) {
            console.log('[stdout] modified version is ' + stdout);
          } else {
            console.log('[stdout] error versioning');
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
